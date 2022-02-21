import firebase, { firestore } from 'firebase/app';
import { adicionado } from '../Analytics';


const db = firebase.firestore();

const refListaRevenda = db.collection('listaRevendas').doc('usuario');


export async function listarProdutos (listener, categoria) {

    const refProdutos = db.collection("produtos");

    let consulta = refProdutos.where("disponivel", "==", true).limit(90);

    if(categoria !== undefined) {
        
        consulta = refProdutos.where("categorias." + categoria, "==", true).where("disponivel", "==", true).limit(90);
    }

    const querySnapshot = await consulta.get();

    let produtos = [];

    if(querySnapshot.size > 0) {
        querySnapshot.forEach(doc => {
            let obj = doc.data();
            produtos.push(obj);
        });

        return listener(produtos);
    } else {
        return listener(produtos);
    }
    
}

export async function categorizando(listener, categoria) {

    if(categoria === undefined) return;

    const refProdutos = db.collection("produtos");

    let consulta = refProdutos.where("categorias." + categoria, "==", true).where("disponivel", "==", true).limit(90);

    const querySnapshot = await consulta.get();

    let produtos = [];

    if(querySnapshot.size > 0) {
        querySnapshot.forEach(doc => {
            let obj = doc.data();
            produtos.push(obj);
        });

        return listener(produtos);
    } else {
        return listener(produtos);
    }
}

export async function obterProduto(id, listener) {
    
    const refProduto = db.collection("produtos").doc(id);
    const document = await refProduto.get();

    if(document.exists) {
        listener(document.data());
        return document.data();
    } else {
        listener(null);
        return null;
    }

}

export async function getServerProduto(id) {
    
    const refProduto = db.collection("produtos").doc(id);
    const document = await refProduto.get();

    if(document.exists) {
        return document.data();
    } else {
        return null;
    }

}

export async function getProdsIds () {

    const refProdutos = db.collection("produtos");

    let consulta = refProdutos.where("disponivel", "==", true).limit(20);

    const querySnapshot = await consulta.get();

    let ids = [];

    if(querySnapshot.size > 0) {
        querySnapshot.forEach(doc => {
            let obj = doc.data().idProduto;
            ids.push(obj);
        });

        return ids;
    } else {
        return ids;
    }
    
}

export function addAoCarrinho(item) {
    const user = firebase.auth().currentUser;
    refListaRevenda.collection(user.uid).doc(item.idProdut).set(item);
    adicionado(item);
}

export function getCarrinho(listener) {
    const user = firebase.auth().currentUser;
    refListaRevenda.collection(user.uid).onSnapshot(querySnapshot => {
        let itens = [];

        if(querySnapshot.size > 0) {
            querySnapshot.forEach(doc => {
                let obj = doc.data();
                itens.push(obj);
            });
        }

        listener(itens);
    });
    
}

export function getItensCarrinho(listener) {
    const user = firebase.auth().currentUser;
    refListaRevenda.collection(user.uid).get().then(querySnapshot => {
        let itens = [];

        if(querySnapshot.size > 0) {
            querySnapshot.forEach(doc => {
                let obj = doc.data();
                itens.push(obj);
            });
        }

        listener(itens);
    });
}

export function removeDoCarrinho(id) {
    const user = firebase.auth().currentUser;
    refListaRevenda.collection(user.uid).doc(id).delete();
}

export function criarIdVenda() {
    let refVenda = db.collection('Revendas').doc();
    let vendaId = refVenda.id;
    return vendaId;
}

export function registrarVenda(venda, listener) {
    let batch = db.batch();
    const user = firebase.auth().currentUser;
    venda.listaDeProdutos.map(item => {
        let id = item.idProdut;
        const user = firebase.auth().currentUser;
        let refCart = refListaRevenda.collection(user.uid).doc(id);
        batch.delete(refCart);
    });

    let refCompra = db.collection('Revendas').doc(venda.idCompra);
    let refMinhaCompra = db.collection('MinhasRevendas').doc('Usuario').collection(user.uid).doc(venda.idCompra);

    batch.set(refCompra, venda);
    batch.set(refMinhaCompra, venda);

    batch.commit().then(() => listener(true)).catch(error => listener(false));

}

export function vendasPorUsuario(listener) {
    const user = firebase.auth().currentUser;
    let refMinhasVendas = db.collection('MinhasRevendas').doc('Usuario').collection(user.uid);
    let d = new Date();
    d.setHours(d.getHours() - 730);
    console.log(d.getTime());
    refMinhasVendas.where('hora', '>=', d.getTime()).orderBy("hora", "desc").onSnapshot(snap => {
        let lista = [];

        if(snap != null && snap.size > 0) {
            
            snap.forEach(doc => {
                let objItem = doc.data();
                lista.push(objItem);
            });
            
        }

        return listener(lista);
    });
}
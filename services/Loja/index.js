import firebase, { firestore } from 'firebase/app';


const db = firebase.firestore();


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
import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ52BXLUj_Jiq9yJ91indygVi27IrbSRE",
  authDomain: "ocapop-69f44.firebaseapp.com",
  databaseURL: "https://ocapop-69f44.firebaseio.com",
  projectId: "ocapop-69f44",
  storageBucket: "ocapop-69f44.appspot.com",
  messagingSenderId: "237281954777",
  appId: "1:237281954777:web:57fd4f8b6bb6d438fae7c8",
  measurementId: "G-K2SQWJZYHZ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const getAnalytics = () => {
    if (typeof window !== "undefined") {
      return firebase.analytics()
    } else {
      return null
    }
}

const analytics = getAnalytics();

export function novaCompra(venda) {
    if(analytics === null) return;
    let itens = Array();
    venda.listaDeProdutos.map((item,index) => {


        let nome = item.produtoName;
        let valorUni = item.valorUni;
        let quantidade = item.quantidade;
        let id = item.idProdut;
        let path = item.caminhoImg;

        let obj = {
            price: valorUni,
            name: nome,
            quantity: quantidade,
            id: id,
            creative_slot: path,
            creative_name: path
        };

        itens.push(obj);      

    });

    analytics.logEvent('purchase', {
        transaction_id: venda.idCompra,
        value: venda.valorTotal,
        currency: 'BRL',
        shipping: 0,
        tax: 0,
        items: itens
    });
}

export function adicionado(item) {
    if(analytics === null) return;
    const {idProdut, produtoName, valorUniComComissao, caminhoImg, quantidade, valorTotalComComissao} = item;
    analytics.logEvent('add_to_cart', {
        items: [{
            price: valorUniComComissao,
            item_name: produtoName,
            item_id: idProdut,
            creative_slot: caminhoImg,
            creative_name: caminhoImg,
            currency: 'BRL',
            quantity: quantidade
        }],
        value: valorTotalComComissao,
        currency: 'BRL'
    });
}

export function viewItem(produto) {
    if(analytics === null) return;
    const {idProduto, prodName, prodValor, imgCapa, quantidade} = produto;
    analytics.logEvent('view_item', {
        items: [{
            price: prodValor,
            item_name: prodName,
            item_id: idProduto,
            creative_slot: imgCapa,
            creative_name: imgCapa,
            currency: 'BRL',
            quantity: 1
        }],
        value: prodValor,
        currency: 'BRL'
    });
}
import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/analytics"
import { metaPixel } from '../../pages/_app';
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

const advancedMatching = {}; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: false, // enable logs
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const getAnalytics = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
    if (typeof window !== "undefined") {
      return firebase.analytics()
    } else {
      return null
    }
}

async function getPixel () {
    if (typeof window !== "undefined") {
      await import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            return ReactPixel;
        });
    } else {
      return null
    }
}

const pixel = getPixel();

const analytics = getAnalytics();



export function novaCompra(venda) {
    const analytics = getAnalytics();
    if(analytics === null) return;
    if(pixel === null) return;
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

    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.track('Purchase', {
                content_ids: venda.idCompra,
                content_name: venda.idCompra,
                content_type: 'product',
                contents: itens,
                currency: 'BRL',
                num_items: itens.length,
                value: venda.valorTotal,
            });
        });

    
}

export function adicionado(item) {
    const analytics = getAnalytics();
    if(analytics === null) return;
    if(pixel === null) return;
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

    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.track('AddToCart', {
                content_ids: idProdut,
                content_name: produtoName,
                content_type: 'product',
                contents: [{
                    price: valorUniComComissao,
                    name: produtoName,
                    id: idProdut,
                    creative_slot: caminhoImg,
                    creative_name: caminhoImg,
                    currency: 'BRL',
                    quantity: quantidade
                }],
                currency: 'BRL',
                value: valorTotalComComissao,
            });
        });
    
}

export function viewItem(produto) {
    const analytics = getAnalytics();
    if(analytics === null) return;
    if(pixel === null) return;
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
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.track('ViewContent', {
                content_ids: idProduto,
                content_name: prodName,
                content_type: 'product',
                contents: [{
                    price: prodValor,
                    name: prodName,
                    id: idProduto,
                    creative_slot: imgCapa,
                    creative_name: imgCapa,
                    currency: 'BRL',
                    quantity: quantidade
                }],
                currency: 'BRL',
                value: prodValor,
            });
        });
    
}

export function landingView() {
    const analytics = getAnalytics();
    if(analytics === null) return;
    if(pixel === null) return;
    analytics.logEvent('landing_view');
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.init('264269985740413');
            ReactPixel.trackCustom('LandingView');
        });
}

export function abrirGrupo() {
    const analytics = getAnalytics();
    if(analytics === null) return;
    if(pixel === null) return;
    analytics.logEvent('join_group');
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.track('SubmitApplication');
        });
}

export function chamarPv() {
    const analytics = getAnalytics();
    if(analytics === null) return;
    if(pixel === null) return;
    analytics.logEvent('sign_up');
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.track('Contact');
        });
}

export function logLogin() {
    const analytics = getAnalytics();
    if(analytics === null) return;
    if(pixel === null) return;
    analytics.logEvent('login');
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.track('Lead');
        });
}
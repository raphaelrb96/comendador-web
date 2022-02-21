import { AppBar, Box, Grid, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '../context/userContext'
import firebase from '../firebase/clientApp'
import { useEffect, useState } from 'react';
import { listarProdutos } from '../services/Loja'
//import { ProgressBar } from 'react-native-paper'
import GridProdutos from '../components/GridProdutos'
import Header from '../components/Header'
import Pb from '../components/Pb'
import Capa from '../components/Capa'
import Intro from '../components/Intro'
import Informacoes from '../components/Informacoes'
import { authListener } from '../services/Usuario';
import { useRouter } from 'next/router';


export const gridSpacing = 3;

export const sections = [
    { title: 'Ofertas', url: '/categorias/0/ofertas', id: '0', nome: 'ofertas' },
    { title: 'Celular', url: '/categorias/1/celular', id: '1', nome: 'celular' },
    { title: 'Video Game', url: '/categorias/3/videogame', id: '3', nome: 'videogame' },
    { title: 'Computador', url: '/categorias/2/computador', id: '2', nome: 'computador' },
    { title: 'Caixa De Som', url: '/categorias/19/sons', id: '19', nome: 'sons' },
    { title: 'Salão', url: '/categorias/10/salao', id: '10', nome: 'salao' },
    { title: 'Casa e Cozinha', url: '/categorias/20/casacozinha', id: '20', nome: 'casacozinha' },
    { title: 'Relogios', url: '/categorias/6/relogios', id: '6', nome: 'relogios' },
    { title: 'Oculos', url: '/categorias/14/oculos', id: '14', nome: 'oculos' },
    { title: 'Brinquedos', url: '/categorias/9/brinquedos', id: '9', nome: 'brinquedos' },
    { title: 'Moda Masculina', url: '/categorias/8/homens', id: '8', nome: 'homens' },
    { title: 'Moda Feminina', url: '/categorias/7/mulheres', id: '7', nome: 'mulheres' },
    { title: 'Variedades', url: '/categorias/18/variedades', id: '18', nome: 'variedades' },
];

const mainFeaturedPost = {
    title: 'VENDEDOR ONLINE ?',
    description:
      "Venha fazer parte do nosso time agora mesmo revendendo nossos produtos e escolhendo quanto quer ganhar por venda...",
    image: './back1.jpg',
    imageText: 'vendedor online',
    linkText: 'Comece agora',
};

function autenticar () {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser()

  const profile = { username: 'nextjs_user', message: 'Awesome!!' }

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user)
    }
    // You also have your firebase app initialized
    console.log(firebase)
  }, [loadingUser, user])

  const createUser = async () => {
    const db = firebase.firestore()
    await db.collection('profile').doc(profile.username).set(profile)
    alert('User created!!')
  }
}


export default function Home() {
  
  const route = useRouter();
  const [produtos, setProdutos] = useState(null);
  const [mUser, setmUser] = useState(undefined);

    useEffect(() => {
        listarProdutos(lista => {
            setProdutos(lista);
        })
    }, []);

    useEffect(() => {
      authListener(u => {
        setmUser(u);
      })
    }, []);


    let containerProdutos = null;

    if(mUser === undefined) {
      return <Intro />
    } else if(mUser === null) {
      setInterval(() => {
        route.push('/login');
      }, 3000);
      
      return <Intro />;
    }

    if(produtos === null) {
        containerProdutos = <Pb/>
    } else {
      if(produtos.length > 0) {
        containerProdutos = <GridProdutos lista={produtos} />;
      }
    }    

  return (
    <div className="container">
        <Head>
            <title>Comendador</title>
        </Head> 

        <main>
            
        <Header title={'Comendador'} sections={sections} />

        <Capa post={mainFeaturedPost}/>
        
        <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Informacoes header expanded={true} />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    {containerProdutos}
                </Grid>
        </Grid>
            
        </main>
    </div>
  )
}

import { Avatar, Button, Container, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Fragment, useEffect, useState } from "react";
import Carrinho from "../components/Carrinho"
import { getCarrinho } from "../services/Loja";
import { authListener } from "../services/Usuario";
import Header from '../components/Header'
import { sections } from ".";
import { colorPrimary } from "../utilidades/Cores";
import Link from "next/link";
import { useRouter } from "next/router";

const carrinho = () => {

    const route = useRouter();

    const [user, setUser] = useState(undefined);
    const [itens, setItens] = useState(undefined);

    useEffect(() => {
        authListener(u => {
            if(u !== null) {
                setUser(u);
            } else {
                route.push('/login');
            }
        })
    }, []);

    useEffect(() => {
        if(user !== undefined && user !== null) {
            getCarrinho(its => {
                console.log('Carrinho zerado /carrinho')
                setItens(its);
            });
        }
    }, [user]);

    return (
        <Box>
            <Header title={'Comendador'} sections={[]} checkout />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper elevation={0} sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Carrinho
                    </Typography>
                    <Fragment>
                        <Carrinho itens={itens} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>

                            <Button
                                style={{background: 'gray'}}
                                variant="contained"
                                onClick={() => route.push('/')}
                                sx={{ mt: 3, ml: 1 }}>
                                Adicionar mais
                            </Button>

                            <Button
                                style={{background: colorPrimary}}
                                variant="contained"
                                onClick={() => route.push('/concluir')}
                                sx={{ mt: 3, ml: 1 }}>
                                continuar
                            </Button>
                        </Box>
                    </Fragment>
                </Paper>
            </Container>
            <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6, marginTop: 1, padding: 3 }}>

                <Typography variant="h6" align="center" color="text.secondary" component="h4">
                    Registre sua venda e enviaremos o pedido ao seu cliente. 
                    Em caso de dúvidas entre em contato com nossa equipe de suporte.
                </Typography>
            </Container>
        </Box>
    )
}

export default carrinho
import { Avatar, Box, Button, Card, CardHeader, CardMedia, Container, Grid, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { gridSpacing, sections } from "."
import Header from "../components/Header"
import Intro from "../components/Intro"
import Pedido from "../components/Pedido"
import { vendasPorUsuario } from "../services/Loja"
import { authListener, logout } from "../services/Usuario"
import LogoutIcon from '@mui/icons-material/Logout';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ItemVenda from "../components/ItemVenda"

const perfil = () => {

    const [vendas, setVendas] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const route = useRouter();

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

            vendasPorUsuario(list => {
                setVendas(list);
            })

        }

    }, [user]);


    if(vendas === undefined) {
        return <Intro />
    }

    let lucro = 0;
    let aReceber = 0;

    for (let i = 0; i < vendas.length; i++) {
        const venda = vendas[i];
        let {comissaoTotal, statusCompra, pagamentoRecebido} = venda;
        lucro = lucro + comissaoTotal;
        if(!pagamentoRecebido && statusCompra === 5) {
            aReceber = aReceber + comissaoTotal;
        }
    }

    return (
        <div>
            <Header title={'Comendador'} sections={sections} />
            <Grid container sx={{paddingLeft: {sm: 2, lg: 10}, paddingRight: {sm: 2, lg: 10}, paddingTop: {xs: 4}}} justifyContent="center" spacing={gridSpacing}>
                <Grid item xs={11} md={4} sm={4}>
                    <Card sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}>

                        <CardHeader
                            title={'Usuario'}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                            sx={{
                                backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[700],
                            }}
                        />
                        <Box sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                        }}>
                            <Avatar sx={{ width: 60, height: 60, padding: 2 }} src="/vendedor.png" />
                        </Box>
                        
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flex: 1}}>
                            {user.displayName}
                        </Typography>

                        <Typography
                            component="h4"
                            variant="h6"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flex: 1}}>
                            {user.email}
                        </Typography>

                        <Box sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                        }}>
                            <ListItemButton onClick={() => {logout()}} >
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        </Box>

                        
                        
                        <br/>
                    </Card>
                </Grid>
                <Grid item xs={11} md={4} sm={4}>
                    <Card sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}>

                        <CardHeader
                            title={'Vendas'}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                            sx={{
                                backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[700],
                            }}
                        />
                        <Box sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                        }}>
                            <Avatar sx={{ width: 60, height: 60, padding: 2 }} src="/vendas.png" />
                        </Box>
                        
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flex: 1}}>
                            {vendas.length} vendas
                        </Typography>

                        <Typography
                            component="h4"
                            variant="h6"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flex: 1}}>
                            Nos ultimos 30 dias
                        </Typography>
                        <Box sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex',
                        marginTop: 1,
                        marginBottom: 1
                        }}>
                            <ListItemText primary={`R$ ${lucro} de lucro`} />
                        </Box>
                        
                        <br/>
                    </Card>
                </Grid>
                <Grid item xs={11} md={4} sm={4}>
                    <Card sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}>

                        <CardHeader
                            title={'Comissões'}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                            sx={{
                                backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[700],
                            }}
                        />
                        <Box sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                        }}>
                            <Avatar sx={{ width: 60, height: 60, padding: 2 }} src="/comissao.png" />
                        </Box>
                        
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flex: 1}}>
                            R$ {aReceber}
                        </Typography>
                        <Typography
                            component="h4"
                            variant="h6"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flex: 1}}>
                            Total disponivel para receber
                        </Typography>
                        <Box sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                        }}>
                            <ListItemButton onClick={() => {route.push(`https://api.whatsapp.com/send?phone=5592981341809&text=Gostaria%20de%20Receber%20meu%20pagamento%20no%20valor%20de%20${aReceber}%20reais`)}} >
                                <ListItemIcon>
                                    <LocalAtmIcon />
                                </ListItemIcon>
                                <ListItemText primary="Solicitar" />
                            </ListItemButton>
                        </Box>
                        <br/>
                    </Card>
                </Grid>
            </Grid>
            <Container style={{marginTop: 50, paddingBottom: 20}}  component="main">
                <br/>
                <Typography
                component="h3"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom>
                    {vendas.length > 0 ? 'Historico de Vendas' : 'Nenhuma Venda'}
                </Typography>
                <br/>
                <Grid container sx={{paddingTop: {xs: 1}}} spacing={2} justifyContent="start">
                    {vendas.map(venda => (
                        <Grid sx={{marginTop: {sm: 2, lg: 5}}} item xs={12} md={4} sm={6}>
                            <Card elevation={3} sx={{p: 4}}>
                                <ItemVenda pedido={venda} />
                            </Card>
                            
                        </Grid>
                    ))}
                </Grid>
                
            </Container>
        </div>
    )
}

export default perfil
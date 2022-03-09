import { Alert, AlertTitle, Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Icon, Link, Paper, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { colorPrimary } from "../utilidades/Cores";
import { authListener, getUser, logarUsuario } from "../services/Usuario";
import { useEffect, useState } from "react";
import Pb from "../components/Pb";
import { useRouter } from "next/router";
const login = () => {

    const [pb, setPb] = useState(false);
    const [alerta, setAlerta] = useState(null);

    const route = useRouter();
    
    useEffect(() => {
        authListener(u => {
            if(u !== null) {
                route.push('/');
            }
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const senha = data.get('password');
        if(senha.length < 6) {
            setAlerta({
                title: 'Senha incompleta',
                mensagem: 'Insira sua senha completa'
            });
            setPb(false);
            console.log('erro');
            return;
        }
        setPb(true);
        logarUsuario(email, senha, (entrar) => {
            if(entrar.sucess) {
                console.log('sucesso');
                route.push('/');
            } else {
                console.log(entrar);
                setPb(false);
                switch(entrar.errorCode) {
                    case 'auth/invalid-email':
                        setAlerta({
                            title: 'Email invalido',
                            mensagem: 'Insira um email valido e tente novamente'
                        });
                        break;
                    case 'auth/user-not-found':
                        setAlerta({
                            title: 'Conta não existe',
                            mensagem: 'Nenhuma conta existente vinculada a esse email'
                        });
                        break;
                    case 'auth/wrong-password':
                        setAlerta({
                            title: 'Senha invalida',
                            mensagem: 'Senha errada. Tente novamente'
                        });
                        break;
                    default:
                        setAlerta({
                            title: 'Erro inesperado',
                            mensagem: 'Tente novamente mais tarde'
                        });
                        break;
                }
            }
        });
        
    };

    let componentExtra = null;

    if(pb) {
        componentExtra = <Pb />;
    } else if(alerta !== null) {
        componentExtra = (
            <Alert style={{width: '90%', marginTop: 30, marginLeft: 20, marginRight: 20}} severity="error">
                <AlertTitle>{alerta.title}</AlertTitle>
                {alerta.mensagem}
            </Alert>
        );
    }

    return (
        <div>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={0}
            md={6}
            lg={7}
            sx={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/ocapop-69f44.appspot.com/o/backlogin.jpg?alt=media&token=354d8519-1f93-4af0-b128-d614fabd7d36)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}/>
                
            <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 1,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar style={{width: 180, height: 180}} sx={{  bgcolor: 'secondary.main' }}>
                    <img src="/comendador.png" style={{width: 180}} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                {componentExtra}
                <Box component="form" noValidate method="post" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Salvar login"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        style={{background: colorPrimary}}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                            Entrar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Esqueceu sua senha ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/cadastro" variant="body2">
                                {"Cria sua conta agora"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                
            </Box>
            
            </Grid>
        </Grid>
        </div>
    )
}

export default login;
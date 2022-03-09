import { Alert, AlertTitle, Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Icon, Link, Paper, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { colorPrimary } from "../utilidades/Cores";
import { authListener, cadastrarUsuario, getUser, logarUsuario } from "../services/Usuario";
import { Fragment, useEffect, useState } from "react";
import Pb from "../components/Pb";
import { useRouter } from "next/router";

const cadastro = () => {
    
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
        const nome = data.get('name');
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
        cadastrarUsuario(email, senha, nome, (entrar) => {
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
                            mensagem: "O endereço de e-mail está mal formatado."
                        });
                        break;
                    case 'auth/email-already-in-use':
                        setAlerta({
                            title: 'Conta ja existe',
                            mensagem: 'O endereço de e-mail já está sendo usado por outra conta.'
                        });
                        break;
                    case 'auth/weak-password':
                        setAlerta({
                            title: 'Senha invalida',
                            mensagem: 'Senha Fraca. Tente uma senha mais segura'
                        });
                        break;
                    default:
                        setAlerta({
                            title: 'Erro',
                            mensagem: 'Erro ao cadastrar'
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
                    <Avatar style={{width: 120, height: 120}} sx={{  bgcolor: 'secondary.main' }}>
                        <img src="/comendador.png" style={{width: 180}} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro
                    </Typography>
                    {componentExtra}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                            id="name"
                            label="Nome"
                            name="name"
                            autoComplete="name"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Confirmar senha"
                            type="password"
                            id="password-confirm"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Confirmo que esse E-mail é meu principal"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            style={{background: colorPrimary}}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cadastrar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Ja tenho uma conta
                                </Link>
                            </Grid>
                            
                        </Grid>
                    </Box>
                    <Box style={{height: 100}} />
                </Box>
            </Grid>
        </Grid>
        </div>
    )
}

export default cadastro
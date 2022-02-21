import { Avatar, Button, Container, createTheme, Paper, Step, StepLabel, Stepper, ThemeProvider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Fragment, useEffect, useState } from "react";
import Carrinho from "../components/Carrinho"
import { criarIdVenda, getCarrinho, getItensCarrinho, registrarVenda } from "../services/Loja";
import { authListener } from "../services/Usuario";
import Header from '../components/Header'
import { sections } from ".";
import { colorPrimary, colorPrimaryDark } from "../utilidades/Cores";
import Link from "next/link";
import { useRouter } from "next/router";
import FormCliente from "../components/FormCliente";
import FormPagamento from "../components/FormPagamento";
import Intro from "../components/Intro";
import Pedido from "../components/Pedido";
import Pb from "../components/Pb";
import { novaCompra } from "../services/Analytics";

const theme = createTheme({
    components: {
        MuiStepper: {
            styleOverrides: {
                root: {
                    ":checked": {
                        color: 'red'
                    },
                    ":hover": {
                        color: 'red'
                    }
                }
            }
        }
    }
});


const steps = ['Endereço', 'Pagamento', 'Confirmação'];

let objectCompraFinal = {
    adress: '',
    complemento: '',
    detalhePag: '',
    formaDePagar: 4,
    hora: 0,
    lat: 0,
    listaDeProdutos: [],
    lng: 0,
    phoneCliente: '',
    nomeCliente: '',
    tipoDeEntrega: 1,
    uidUserRevendedor: '',
    userNomeRevendedor: '',
    pathFotoUserRevenda: '',
    comissaoTotal: 0,
    valorTotal: 0,
    frete: 0,
    compraValor: 0,
    statusCompra: 1,
    idCompra: '',
    vendaConcluida: false,
    pagamentoRecebido: false
};

export let nome = '';
export let phone = '';
export let rua = '';
export let bairro = '';
export let pagamento = 4;
export let taxa = 0;

export function setNome (valor) {
    nome = valor.target.value;
}

export function setPhone (valor) {
    phone = valor.target.value;
}

export function setRua (valor) {
    rua = valor.target.value;
}

export function setBairro (valor) {
    bairro = valor.target.value;
}

export function setPagamento(valor) {
    pagamento = valor
}

export function setTaxa (valor) {
    taxa = valor;
}


const concluir = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [pedido, setPedido] = useState(objectCompraFinal); 
    const [user, setUser] = useState(undefined);

    const route = useRouter();

    const {complemento, adress, nomeCliente, phoneCliente, formaDePagar, listaDeProdutos, frete} = pedido;

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
        if(listaDeProdutos.length > 0) {
            return;
        } 
        if(user !== undefined && user !== null) {

            getItensCarrinho(itens => {
                
                if(itens.length === 0 && activeStep < 3) {
                    route.push('/carrinho');
                    
                } else {
                    setPedido((prevState) => ({
                        ...prevState,
                        listaDeProdutos: itens
                    }));
                }
                
            });

        }
    }, [user]);

    useEffect(() => {
        if(activeStep === 3) {
            registrarVenda(pedido, sucess => {
                if(sucess) {
                    console.log('Venda registrada');
                    route.push('/perfil');
                    novaCompra(pedido);
                } else {
                    setActiveStep(2);
                }
            })
        }
    }, [activeStep]);

    const handleNext = () => {
        if(activeStep === 1) {
            let totalSub = frete;
            let comissaoTotal = 0;
            listaDeProdutos.map(item => {
                totalSub = totalSub + item.valorTotalComComissao;
                comissaoTotal = comissaoTotal + item.comissaoTotal;
            });

            let vendaId = criarIdVenda();

            setPedido((prevState) => ({
                ...prevState,
                compraValor: totalSub,
                valorTotal: totalSub,
                uidUserRevendedor: user.uid,
                userNomeRevendedor: user.displayName,
                idCompra: vendaId,
                comissaoTotal: comissaoTotal,
                hora: new Date().getTime(),
                complemento: bairro,
                adress: rua,
                nomeCliente: nome,
                phoneCliente: phone,
                frete: taxa,
                formaDePagar: pagamento
            }));
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function setPagamento(valor) {
        console.log(valor);
        setPedido((prevState) => ({
            ...prevState,
            formaDePagar: valor
        }));
    }

    function setTaxa(valor) {
        setPedido((prevState) => ({
            ...prevState,
            frete: valor
        }));
    }

    function setRua(valor) {
        console.log(valor.target.value);
        setPedido((prevState) => ({
            ...prevState,
            adress: valor.target.value
        }));
    }

    function setBairro(valor) {
        console.log(valor.target.value);
        setPedido((prevState) => ({
            ...prevState,
            complemento: valor.target.value
        }));
    }

    function setTelefone(valor) {
        console.log(valor.target.value);
        setPedido((prevState) => ({
            ...prevState,
            phoneCliente: valor.target.value
        }));
    }

    function setNomeUser(valor) {
        console.log(valor.target.value);
        setPedido((prevState) => ({
            ...prevState,
            nomeCliente: valor.target.value
        }));
    }

    function getStepper(step) {
        switch (step) {
            case 0:
            return <FormCliente />;
            case 1:
            return <FormPagamento setPagamento={setPagamento} setTaxa={setTaxa} />;
            default:
            return <Pedido pedido={pedido} />
            
        }
    }

    function ContainerMain()  {

        if(activeStep === steps.length) {
            return <Intro />;
        }

        return(
            <Fragment>
                {getStepper(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Voltar
                        </Button>
                    )}
                                    

                    <Button
                        style={{background: colorPrimary}}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}>
                        {activeStep === steps.length - 1 ? 'Concluir' : 'Continuar'}
                    </Button>
                </Box>
            </Fragment>
            
        );
    }


    if(listaDeProdutos.length === 0) {
        return <Intro />
    }


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Header title={'Comendador'} sections={[]} checkout />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper elevation={0} sx={{ my: { xs: 2, md: 4 }, p: { xs: 0, md: 0 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Concluir Pedido
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                            <Step  key={label}>
                                <StepLabel theme={theme}>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                        <Fragment>

                            <ContainerMain />
                            
                        </Fragment>
                    </Paper>
                </Container>
                <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6, marginTop: 1, padding: 3 }}>

                    <Typography variant="h6" align="center" color="text.secondary" component="h4">
                        Insira os dados corretamente para facilitar o motoboy encontrar o cliente. 
                        O prazo de entrega é de 1 a 4 horas.
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
        
    )
}

export default concluir
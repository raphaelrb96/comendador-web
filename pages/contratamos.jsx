import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { colorPrimary } from "../utilidades/Cores";
import Header from "../components/Header";
import { sections } from ".";
import { chamarPv } from "../services/Analytics";
import { useRouter } from "next/router";


function ContainerHeader() {

    return(
        <Grid style={{flexDirection: 'row', flex: 1, marginTop: 46}} alignContent="space-around" alignItems="center" justifyContent="center" container>
            
            <Grid item sm={5} md={4} style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <Typography 
                    component="h3" 
                    variant="h5" 
                    sx={{
                        marginLeft: {xs: 3, sm: 2}, 
                        marginRight: {xs: 3, sm: 2}, 
                        textAlign: {xs: 'center', sm: 'start'},
                        fontWeight: '600'
                    }}>
                    TRABALHE COM A GENTE 
                </Typography>
                <Typography 
                    component="p" 
                    variant="body1" 
                    sx={{
                        marginLeft: {xs: 3, sm: 2}, 
                        marginRight: {xs: 3, sm: 2}, 
                        textAlign: {xs: 'center', sm: 'start'},
                        marginTop: 1
                    }}>
                    Estamos em busca de novos consultores de vendas para participar de nosso time. Buscamos pessoas com foco, determinação e ambiciosas que gostem de progredir. Temos grandes oportunidades de lucro e crescimento.
                </Typography>
                <Grid container sx={{justifyContent: {xs: 'center', sm: 'start'}, alignContent: {xs: 'center', sm: 'start'}, alignItems: {xs: 'center', sm: 'start'}}} >
                    
                </Grid>
                
                
            </Grid>
            <Grid sx={{order: {xs: -1, sm: 1}}}  item md={4} sm={6}>
                <img style={{width: '100%'}} src="/recrutador.jpg" />
            </Grid>
        </Grid>
    );
}

function SuperCardRecrutador() {

    const route = useRouter();

    const chamarNoPv = () => {
        chamarPv();
        const linkPv = 'https://api.whatsapp.com/send?phone=5592988461303&text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20vaga%20de%20vendedor%20online';
        route.push(linkPv);
    };

    return (
        <Grid container alignContent="center" justifyContent="center" alignItems="center">
            <Grid xs={10} item>
                <Paper sx={{
                    background: '#7B00CD',
                    paddingTop: 5,
                    paddingBottom: 5,
                    marginTop: 10,
                    marginBottom: 20,
                    borderRadius: 5
                }}>
                    <Grid style={{flexDirection: 'row', flex: 1, marginTop: 1}} alignContent="space-around" alignItems="center" justifyContent="center" container>
                        
                        <Grid style={{marginBottom: 10}} item md={6} sm={6}>
                            <img style={{width: '100%'}} src="/recrut.jpg" />
                        </Grid>

                        <Grid item sm={5} md={4} spacing={3} style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                            <Typography 
                                component="h3" 
                                variant="h5" 
                                color="#fff" 
                                sx={{
                                    fontWeight: '600',
                                    marginLeft: {xs: 3, sm: 0}, 
                                    marginRight: {xs: 3, sm: 0}, 
                                    textAlign: {xs: 'center', sm: 'start'}
                                }}>
                                Fale com nosso recrutador pelo Whatspp clicando no botão abaixo
                            </Typography>
                            <Typography 
                                component="p" 
                                variant="body2" 
                                color="#fff" 
                                sx={{
                                    marginTop: 2,
                                    marginLeft: {xs: 3, sm: 0}, 
                                    marginRight: {xs: 3, sm: 0}, 
                                    textAlign: {xs: 'center', sm: 'start'}
                                }}>
                                Garanta sua vaga agora. Aproveite pois as vagas são limitadas e tem muitos interessados nessa oportunidade!
                            </Typography>
                            <Grid 
                                container 
                                sx={{
                                    justifyContent: {xs: 'center', sm: 'start'}, 
                                    alignContent: {xs: 'center', sm: 'start'}, 
                                    alignItems: {xs: 'center', sm: 'start'},
                                    paddingLeft: {xs: 3, sm: 0}, 
                                    paddingRight: {xs: 3, sm: 0}, 
                                }}>
                                <Button onClick={chamarNoPv} className="button-download-your-free-theme3">
                                    <img src="/whats.png" style={{width: 55, marginRight: 6}} />
                                    <Typography component="p" className="txt-8922">INICIAR CONVERSA</Typography>
                                </Button>
                            </Grid>
                            
                            
                        </Grid>
                        
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

        
    )
}

const contratamos = () => {
    return (
        <div>
            <Header title={'Comendador'} checkout />
            <ContainerHeader />
            <SuperCardRecrutador />
        </div>
    )
}

export default contratamos;
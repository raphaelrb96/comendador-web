import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { delBasePath } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { gridSpacing, sections } from "..";
import Campo from "../../components/Campo";
import FotoList from "../../components/FotoList";
import Header from "../../components/Header";
import Pb from "../../components/Pb";
import Quadro from "../../components/Quadro";
import { getProdsIds, getServerProduto, obterProduto } from "../../services/Loja";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import { colorPrimary } from "../../utilidades/Cores";

const fetcher = async (...args) => {
    const res = await fetch(...args);

    return res.json();
};

function DadosProd({title, main, infoMain, bt1, bt2, click1, click2}) {

    let componentButtons = (
        <>
            <Button variant="outlined" color="secondary" style={{color: '#727272'}} onClick={click2} fullWidth>
                {bt2}
            </Button>
            <Button variant="outlined" color="secondary" style={{color: '#727272'}} onClick={click1} fullWidth>
                {bt1}
            </Button>
            
        </>
    );

    if(bt2 === undefined) {
        componentButtons = (
            <Button variant="outlined" color="inherit" onClick={click1} style={{color: '#000'}} fullWidth>
                {bt1}
            </Button>
        );
    }

    return (
            <Grid
              item
              xs={12}
              lg={4}
              sm={6}
              md={4}
            >
              <Card style={{marginTop: 10}}>
                <CardHeader
                  title={title}
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
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography textAlign={'center'} component="h2" variant="h3" color="text.primary">
                      {main}
                    </Typography>
                    
                  </Box>
                  <Typography variant="h6" textAlign={'center'} color="text.secondary">
                      {infoMain}
                  </Typography>
                </CardContent>
                <CardActions>
                  {componentButtons}
                </CardActions>
              </Card>
            </Grid>
    )
}

function DadosComissao({prod}) {
    return <DadosProd title={'Comissão'} main={`R$${prod.comissao}`} infoMain={'Por unidade vendida'} bt1={'Aumentar'} bt2={'Diminuir'} />;
}

function DadosQuantidade({setQuantidade, quantidade}) {
    const click1 = () => {
        setQuantidade(true);
    };
    const click2 = () => {
        setQuantidade(false);
    };
    return <DadosProd title={'Quantidade'} main={quantidade} infoMain={'Itens pra venda'} bt1={'Aumentar'} bt2={'Diminuir'} click1={click1} click2={click2} />;
}

function DadosConclusao({item}) {
    let {valorTotalComComissao} = item;
    return <DadosProd title={'Total'} main={`R$ ${valorTotalComComissao},00`} infoMain={'Valor a pagar'} bt1={'Adicionar ao Carrinho'} />;
}

function Content({componentImg, prod, item, setQuantidade}) {
    const {quantidade, valorTotal, valorTotalComComissao, comissaoTotal, valorUni, valorUniComComissao, comissaoUnidade} = item;
    return(
        <>
            <Grid style={{paddingLeft: 16, paddingRight: 16, marginTop: 10}} justifyContent="center" justifyItems="center" alignItems="flex-start" container spacing={gridSpacing}>
                    <Grid item lg={5} md={5} sm={6} xs={12}>
                        {componentImg}
                    </Grid>
                    <Grid item lg={5} md={5} sm={6} xs={12}>
                        <div>
                            <Typography fontFamily={'fantasy'} variant="h3">
                                {prod.prodName}
                            </Typography>
                            <br/>
                            <Typography style={{fontWeight: 'bold'}} variant="h4">
                                R${prod.prodValor},00
                            </Typography>
                            <br/>
                            <Typography variant="h6">
                                {prod.descr}
                            </Typography>
                        </div>
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
                    Detalhes da Venda
                </Typography>
                <br/>
                <br/>
                <Grid container spacing={3} alignItems="center" justifyContent="center" justifyItems="center">
                    <DadosComissao prod={prod} item={item} />
                    <DadosQuantidade prod={prod} item={item} setQuantidade={setQuantidade} quantidade={quantidade} />
                    <DadosConclusao item={item} />
                </Grid>
            </Container>

            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6, marginTop: 1 }}>

                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Você escolhe quanto quer ganhar por produto vendido. Podendo aumentar o valor do produto para ter uma comissão maior
                </Typography>
            </Container>
            
        </>
        
    );
}

const produtos = () => {

    const route = useRouter();
    //const {id} = route.query;
    let id = route.query.id;

    const [prod, setProd] = useState(undefined);
    const [item, setItem] = useState({});

    const {quantidade, valorTotal, valorTotalComComissao, comissaoTotal, valorUni, valorUniComComissao, comissaoUnidade} = item;

    const setQuantidade = (aumentar) => {

        if(aumentar) {
            //aumentar
            console.log('Aumentar');
            let q = quantidade + 1;
            let vt = valorUni * q;
            let vtc = valorUniComComissao * q;
            let ct = comissaoUnidade * q;

            setItem((prevState) => ({
                ...prevState,
                quantidade: q,
                valorTotal: vt,
                valorTotalComComissao: vtc,
                comissaoTotal: ct
            }));
        } else {
            //diminuir
            console.log('Diminuir');
            if(quantidade > 1) {
                let q = quantidade - 1;
                let vt = valorUni * q;
                let vtc = valorUniComComissao * q;
                let ct = comissaoUnidade * q;

                setItem((prevState) => ({
                    ...prevState,
                    quantidade: q,
                    valorTotal: vt,
                    valorTotalComComissao: vtc,
                    comissaoTotal: ct
                }));
            }
        }

        
    }

    const setComissioes = (c, v, q) => {
        setItem((prevState) => ({
            ...prevState,
            comissaoUnidade: c,
            valorUniComComissao: v
        }));
    };

    
    
    const getProduto = () => {
        if(id === null || id === undefined) {
            //setProd(null);
            return;
        }
        obterProduto(id, (d) => {
            //console.log(d);
            

            let mProduto = d;
            let docm = {
                caminhoImg: mProduto.imgCapa,
                idProdut: mProduto.idProduto,
                labo: mProduto.fabricante,
                produtoName: mProduto.prodName,
                quantidade: 1,
                valorTotal: mProduto.prodValor,
                valorUni: mProduto.prodValor,
                valorUniComComissao: mProduto.prodValor,
                valorTotalComComissao: mProduto.prodValor,
                comissaoUnidade: mProduto.comissao,
                comissaoTotal: mProduto.comissao
            };
            setProd(d);
            setItem(docm);
        });
    };

    useEffect(getProduto, [id]);
    

    let componentImg = <Quadro cor={'#ff0000ca'} />;
    let container = null;
    let containerFotos = null;

    if(prod !== null && prod !== undefined) {
        componentImg = <img src={prod.imgCapa} style={{width: '100%'}} />;
        container = <Content componentImg={componentImg} item={item} setQuantidade={setQuantidade} prod={prod} />

        containerFotos = (
            <FotoList imagens={prod.imagens}/>
        );
    } else if(prod === undefined) {
        container = <Pb />;
    } else if(prod === null) {
        container = (
            <div>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    style={{
                        marginTop: 20
                    }}
                    sx={{ flex: 1}}>
                    Nenhum produto encontrado
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <Header title={'Comendador'} sections={sections} />
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    {container}
                </Grid>
            </Grid>
        </div>
    )
}

export default produtos;

/*
export async function getServerSideProps ({params})  {
    console.log('Get Server Side Props');
    const data = await getServerProduto(params.produto);
    //console.log(data);
    const produto = data.idProduto;
    if(data === null) return {notFound: true};
    return {props: {produto}};
};





export async function getStaticPaths() {
    console.log('Get Static Paths');
    const ids = await getProdsIds();
    const paths = ids.map(id => ({
        params: { 
            produto: id,
        },
    }));

    return {paths, fallback: true };
}

export async function getStaticProps({ params }) {
    console.log('Get Static Props');
    const data = await getServerProduto(params.produto);
    console.log(data);
    
    if(data === null) return {notFound: true};
    const produto = data.idProduto;
    return {props: {produto}};
}

*/
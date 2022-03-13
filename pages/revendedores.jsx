import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import Quadro from "../components/Quadro";
import { colorPrimary } from "../utilidades/Cores";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Intro from "../components/Intro";
import { Box } from "@mui/system";
import { useState } from "react";
import { useRouter } from "next/router";
import { abrirGrupo, chamarPv, landingView } from "../services/Analytics";

let text1 = 'SIM, você pode ganhar dinheiro na internet todos os dias, de qualquer lugar a qualquer hora';

function CTA({entrar}) {

    const [click, setClick] = useState(false);

    return(
        <Grid container padding={3} className="cta-02 flex-col-hcenter-vstart clip-contents">
            <Grid item className="section-heading flex-col-hstart-vstart clip-contents">
                <Typography component="p" sx={{fontSize: { xs: 25, sm: 50 }}} className="txt-866 flex-hcenter">
                    ENTRE PARA NOSSO GRUPO VIP DO WHATSAPP PARA TIRAR SUAS DÚVIDAS E COMEÇAR OS TRABALHOS
                </Typography>
            </Grid>
            <Grid item className="flex-row-vcenter-hcenter">
                <Button onClick={() => {
                    setClick(true)
                    entrar()
                }} className="button-download-your-free-theme2">
                    <img src="/whats.png" style={{width: 55, marginRight: 6}} />
                    <Typography component="p" className="txt-892 flex-hcenter">{!click ? 'ENTRAR NO GRUPO' : 'ENCAMINHANDO'}</Typography>
                </Button>
            </Grid>
            <Typography component="p" className="text-cta flex-hcenter">
                Clicando no botão você será redirecionado para o Whatsapp 
            </Typography>
        </Grid>
    )
}

function Vantagens() {
  return (
    <Grid container alignItems="center" justifyContent="center" alignContent="center" className="features-12 flex-col-hcenter-vstart">
      
      <Grid xs={12} sm={12} md={8} lg={8} alignItems="center" justifyContent="center" alignContent="center" item className="section-heading flex-col-hstart-vstart clip-contents">
        <Typography component="p" className="txt-642 flex-hcenter">
          Vantagens de trabalhar na nossa equipe de vendedores Home Office
        </Typography>
        <Typography component="p" className="txt-490 flex-hcenter">
          Nossa empresa é o lugar perfeito pra quem trabalha ou ja trabalhou
          alguma vez na vida com vendas online. E o lugar certo pra quem quer
          começar empreender online.
        </Typography>
      </Grid>

      <Grid container alignItems="center" justifyContent="center" alignContent="center" className="row-01 flex-row-vcenter-hstart">
          
          <Grid xs={12} sm={6} md={6} lg={4} alignItems="center" justifyContent="center" alignContent="center" item className="_feature-item flex-col-hcenter-vstart">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-I158%3A1565%3B1974%3A8879%3B1974%3A8504?alt=media&token=84603cfd-7592-4bdb-8270-d2b040808eca"
              alt="image not found"
              className="base-feature-icon"
            />
            <div className="content flex-col-hcenter-vstart clip-contents">
              <Typography component="p" className="txt-482 flex-hcenter">Muitos Produtos</Typography>
              <Typography component="p" className="txt-172 flex-hcenter">
                Temos mais de 400 itens cadastrados no nosso site para você
                escolher.
              </Typography>
            </div>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={4} alignItems="center" justifyContent="center" alignContent="center" item className="_feature-item flex-col-hcenter-vstart">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-I158%3A1565%3B1974%3A8880%3B1974%3A8504?alt=media&token=0bdf806c-a034-48ba-a3da-8166cf24da64"
              alt="image not found"
              className="base-feature-icon"
            />
            <div className="content flex-col-hcenter-vstart clip-contents">
              <Typography component="p" className="txt-482 flex-hcenter">Flexibilidade</Typography>
              <Typography component="p" className="txt-172 flex-hcenter">
                Liberdade pra fazer a qualquer lugar, em qualquer hora.
              </Typography>
            </div>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={4} alignItems="center" justifyContent="center" alignContent="center" item className="_feature-item flex-col-hcenter-vstart">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-I158%3A1565%3B1974%3A8881%3B1974%3A8504?alt=media&token=ffe34098-4768-41a6-a50d-6acce991dcef"
              alt="image not found"
              className="base-feature-icon"
            />
            <div className="content flex-col-hcenter-vstart clip-contents">
              <Typography component="p" className="txt-482 flex-hcenter">Investimento Zero</Typography>
              <Typography component="p" className="txt-172 flex-hcenter">
                Você so precisa de um celular com internet e mais nenhum
                investimento
              </Typography>
            </div>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={4} alignItems="center" justifyContent="center" alignContent="center" item className="_feature-item flex-col-hcenter-vstart">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-I158%3A1565%3B1974%3A8883%3B1974%3A8504?alt=media&token=f2193c34-ea01-44c8-9a59-db9018704594"
              alt="image not found"
              className="base-feature-icon"
            />
            <div className="content flex-col-hcenter-vstart clip-contents">
              <Typography component="p" className="txt-482 flex-hcenter">Entrega Certa</Typography>
              <Typography component="p" className="txt-172 flex-hcenter">
                Para cidade de Manaus entregamos no mesmo dia. De 9 as 22
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={4} alignItems="center" justifyContent="center" alignContent="center" item className="_feature-item flex-col-hcenter-vstart">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-I158%3A1565%3B1974%3A8884%3B1974%3A8504?alt=media&token=74c0ba1d-bad2-49d9-9681-e82e256ac6d0"
              alt="image not found"
              className="base-feature-icon"
            />
            <div className="content flex-col-hcenter-vstart clip-contents">
              <Typography component="p" className="txt-482 flex-hcenter">Liberdade</Typography>
              <Typography component="p" className="txt-172 flex-hcenter">
                Você escolhe sua comissão, aumentando o valor do produto pra
                ganhar mais
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={4} alignItems="center" justifyContent="center" alignContent="center" item className="_feature-item flex-col-hcenter-vstart">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-I158%3A1565%3B1974%3A8885%3B1974%3A8504?alt=media&token=d42f2a6b-e109-422f-8813-1141e76eaad3"
              alt="image not found"
              className="base-feature-icon"
            />
            <div className="content flex-col-hcenter-vstart clip-contents">
              <Typography component="p" className="txt-482 flex-hcenter">Organização</Typography>
              <Typography component="p" className="txt-172 flex-hcenter">
                Todas suas vendas ficam disponiveis pra você se atualizar a
                qualquer momento
              </Typography>
            </div>
          </Grid>
      </Grid>
    </Grid>
  )
}

function Navbarhero({scroll, home}) {
    return (
      <Grid container alignItems="center" justifyContent="center" component="main" className="navbar-_hero">

        <Avatar onClick={home} style={{width: 180, height: 180}}>
            <img src="/comendador.png" style={{width: 180}} />
        </Avatar>
        
        <Grid alignItems="center" sx={{paddingLeft: {md: 20}, paddingRight: {md: 20}}} alignContent="center" className="flex-col-hcenter">
          <div className="group-844 flex-row-vend">
            
          </div>
          <Typography sx={{fontSize: { xs: 30, sm: 50 }}} className="txt-6102">
            Estamos procurando pessoas para ganhar dinheiro trabalhando de casa
          </Typography>
          <p className="txt-248">COM VENDAS ONLINE</p>
          <Typography component="p" className="txt-bt">
            Mesmo se não souber absolutamente nada sobre vendas online. Nossa equipe vai da todo suporte necessario para alcançar bons resultados.
          </Typography>
          <Typography component="h6" className="txt-848">
            Click no botão abaixo para conversar com um de nossos representantes no WhatsApp.
          </Typography>
          <Button onClick={scroll} className="button-download-your-free-theme2">
            <img src="/whats.png" style={{width: 55, marginRight: 6}} />
            <Typography component="p" className="txt-892">INICIAR CONVERSA</Typography>
          </Button>
        </Grid>
      </Grid>
    )
}

function InformacaoTopo() {
    return (
      <Grid container alignItems="center" justifyContent="center" alignContent="center" className="features">
        <div className="flex-col-hcenter-f">
          <div className="flex-col-hcenter-f">

            <Typography component="p" textAlign={'center'} className="txt-775-f">DIVULGOU, VENDEU, GANHOU !</Typography>
            <Typography component="p" style={{width: '70%'}} textAlign={'center'} >
              VOCÊ ENTRA PRA NOSSA EQUIPE DE VENDAS HOME OFFICE, ESCOLHE O PRODUTO
              E QUANTO QUER GANHAR POR VENDA, ANUNCIA NAS REDES SOCIAIS E PRONTO.
              QUANDO SEU CLIENTE RECEBER O PRODUTO, VOCÊ SOLICITA SUA COMISSÃO
            </Typography>

            <Grid item sx={{marginTop: {xs: 30}}} className="group-569 flex-col-hend">

              <Grid alignItems="center" justifyContent="center" alignContent="center" container className="feature-1 flex-row-vcenter">

                <Grid md={4} xs={12} sm={10} lg={5} item order={{md: 0, xs: 1}} className="group-089 flex-col-hcenter-f">
                    <Typography component="p" className="txt-653 flex-hcenter">CADASTRO E ACESSO AO GRUPO</Typography>
                    <Typography component="p" className="txt-402 flex-hcenter">
                    O primeiro passo é entrar no nosso grupo de whatsapp para tirar
                    todas suas duvidas. Em seguida você fará cadastro na nossa
                    plataforma para ter acesso ao produtos, preços e comissões
                    </Typography>
                </Grid>
                <Grid md={6} xs={8} sm={6} lg={4} order={{md: 1, xs: 0}} alignItems="center" justifyContent="center" alignContent="center" item>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-5%3A29?alt=media&token=2d9002d4-6acf-4ab3-9de7-64bbe2e8cec6"
                        alt="image not found"
                        className="feature-2-svg"
                    />
                </Grid>
                
              </Grid>

              <Grid container alignItems="center" justifyContent="center" alignContent="center" className="feature-1 flex-row-vcenter">
                <Grid md={6} xs={8} sm={6} lg={4} item>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-5%3A134?alt=media&token=7c70c049-879d-495f-a4d0-702463e52e43"
                        alt="image not found"
                        className="feature-2-svg"
                    />
                </Grid>
                
                <Grid md={4} xs={12} sm={10} lg={5} item className="group-089 flex-col-hcenter-f">
                  <Typography component="p" className="txt-653 flex-hcenter">ANUNCIAR E VENDER</Typography>
                  <Typography component="p" className="txt-402 flex-hcenter">
                    O segundo passo é escolher os produtos e divulgar nas suas
                    redes sociais (Face, Olx, Insta) até encontrar um possivel
                    cliente insterssado. QUANTO MAIS ANUNCIAR MAIOR CHANCE DE
                    VENDER
                  </Typography>
                </Grid>
                
              </Grid>

              <Grid container alignItems="center" justifyContent="center" alignContent="center" className="feature-1 flex-row-vcenter">

                <Grid md={4} xs={12} sm={10} lg={5} item order={{md: 0, xs: 1}} className="group-089 flex-col-hcenter-f">
                  <Typography component="p" className="txt-653 flex-hcenter">
                    REGISTRAR E RECEBER SEU LUCRO
                  </Typography>
                  <Typography component="p" className="txt-402 flex-hcenter">
                    Ja encontrou um cliente e solicitou o endereço da entrega,
                    agora você registra sua venda no nossa site para nossa equipe
                    enviar a compra. E assim que ela for concluida você terá sua
                    comissão disponivel
                  </Typography>
                </Grid>
                <Grid md={6} xs={8} sm={6} lg={4} order={{md: 1, xs: 0}} sx={{marginTop: {xs: 4}}} item>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/VOPgp5rVa8OhmbgJjtsxNr-5%3A188?alt=media&token=038de64f-8c5e-4a59-93ef-4afb2e54057c"
                        alt="image not found"
                        className="feature-2-svg"
                    />
                </Grid>
                
              </Grid>

            </Grid>

          </div>
        </div>
      </Grid>
    )
}

function Metricas() {

    return (
        <Grid container alignContent="space-between" alignItems="center" justifyContent="space-around" className="metrics-04 flex-row-vstart-hstart">
            
            <Grid xs={12} sm={6} md={6} lg={3} item className="_-1 flex-col-hstart-vstart">
                <div className="details flex-col-hstart-vstart clip-contents">
                    <Typography component="p" className="txt-471">+400</Typography>
                    <Typography component="p" >Itens disponiveis</Typography>
                </div>
                <div
                className="line"
                />
            </Grid>
            
            <Grid xs={12} sm={6} md={6} lg={3} item className="_-1 flex-col-hstart-vstart">
                <div className="details flex-col-hstart-vstart clip-contents">
                    <Typography component="p" className="txt-471">+100</Typography>
                    <Typography component="p">Vendedores ativos </Typography>
                </div>
                <div
                className="line"
                />
            </Grid>
            
            <Grid xs={12} sm={6} md={6} lg={3} item className="_-1 flex-col-hstart-vstart">
                <div className="details flex-col-hstart-vstart clip-contents">
                    <Typography component="p" className="txt-471">+5.000</Typography>
                    <Typography component="p">Pagos semanalmente</Typography>
                </div>
                <div
                className="line"
                />
            </Grid>
            
            <Grid xs={12} sm={6} md={6} lg={3} item className="_-1 flex-col-hstart-vstart">
                <div className="details flex-col-hstart-vstart clip-contents">
                    <Typography component="p" className="txt-471">+Bônus</Typography>
                    <Typography component="p">Para vendedores</Typography>
                </div>
                <div
                className="line"
                />
            </Grid>
        </Grid>
    );
}

const revendedores = () => {

    const ctaRef = useRef(null);
    const route = useRouter();

    const scrollToCTA = () => {
        ctaRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const home = () => {
        route.push('/');
    }

    const entrarNoGrupo = () => {
        abrirGrupo();
        const link = 'https://chat.whatsapp.com/D2oNoXfU68y5dCAOx9v60L';
        route.push(link);
    };

    const chamarNoPv = () => {
      chamarPv();
      const linkPv = 'https://api.whatsapp.com/send?phone=5592988461303&text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20vaga%20de%20vendedor%20online';
      route.push(linkPv);
    }

    useEffect(() => {
      landingView();
    }, []);

    return (
        <Grid alignContent={'center'} justifyContent="center" container>
            <Grid item>
                <Navbarhero scroll={chamarNoPv} home={home} />
            </Grid>
            
            <Grid item>
                <InformacaoTopo />
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12} item>
                <Metricas />
            </Grid>

            <Grid item>
                <Vantagens />
            </Grid>
            
            <Grid ref={ctaRef} item>
                <CTA entrar={entrarNoGrupo} />
            </Grid>

        </Grid>
    )
}

export default revendedores
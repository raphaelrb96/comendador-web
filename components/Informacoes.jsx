import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Quadro from "./Quadro";
import Cartao from "./Cartao";
import { useState } from "react";

const gridSpacing = 3;

const provas = [
    {
        title: 'Entrega',
        text: 'De 9:00 as 22:00',
        description: [
            'Mais de 12 entregadores a disposição',
            'Equipe profissional',
            'Entrega rápida',
            'Frete grátis na maioria dos bairros'
        ]
    },
    {
        title: 'Garantia',
        text: '7 dias para troca',
        description: [
            'Para Defeito de Fabricação',
            'Suporte da utilização dos produtos',
            'Custo do frete R$10',
            'Prazo de ate 48h para solução'
        ]
    },
    {
        title: 'Suporte',
        text: 'Profissionais Treinados',
        description: [
            'Equipe online para tirar duvidas',
            'Estoque abastecido',
            'Produtos de qualidade',
            'Ajuda via grupo do Whatsapp '
        ]
    },
];





const Informacoes = ({expanded, header}) => {

    const [aberto, setAberto] = useState(expanded);

    const mudar = (obj, expanded) => {
        console.log(obj);
        console.log(expanded);
        setAberto(expanded);
    };

    let componentHeader = null;

    if(header) {
        componentHeader = (
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography style={{fontWeight: 'bold'}} component="h3" variant="h5">Informações</Typography>
            </AccordionSummary>
        );
    }

    return (
        <div>
            <Accordion elevation={0} style={{marginRight: 16, marginLeft: 16}} expanded={aberto} onChange={mudar}>
                {componentHeader}

                <AccordionDetails>
                    <Grid style={{paddingLeft: 16, paddingRight: 16}} justifyContent="space-around" justifyItems="center" alignItems="flex-start" container spacing={gridSpacing}>

                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Cartao title={provas[0].title} text={provas[0].text} description={provas[0].description} />
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Cartao title={provas[1].title} text={provas[1].text} description={provas[1].description} />
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Cartao title={provas[2].title} text={provas[2].text} description={provas[2].description} />
                        </Grid>
                        
                    
                    </Grid>
                </AccordionDetails>

            </Accordion>
        </div>
    )
}

export default Informacoes;
import { Grid, Typography } from "@mui/material";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { sections } from "../../..";
import GridProdutos from "../../../../components/GridProdutos";
import Header from "../../../../components/Header";
import Pb from "../../../../components/Pb";
import { categorizando } from "../../../../services/Loja";


const gridSpacing = 3;



const index = ({cat}) => {
    const route = useRouter();
    //const {id} = route.query;
    let id = cat?.id || route.query.id;

    const [prods, setProds] = useState(null);

    const categorizar = () => {
        categorizando(lista => {
            setProds(lista);
        }, id);
    };

    useEffect(categorizar, [id]);

    let containerProdutos = null;


    if(prods === null) {
        containerProdutos = <Pb />;
    } else {
      if(prods.length > 0) {
        containerProdutos = <GridProdutos lista={prods} />;
      } else {
          containerProdutos = (
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
    } 




    return (
        <div>

            <main>
                
                <Header title={'Comendador'} sections={sections} />
            
                <Grid container spacing={gridSpacing}>
                    <Grid item md={12} lg={12} xs={12}>
                        {containerProdutos}
                    </Grid>
                </Grid>
                
            </main>
        </div>
    )
}


export default index;

export async function getStaticPaths() {
    const paths = sections.map(categ => ({
        params: { 
            id: categ.id,
            nome: categ.nome
        },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const categId = params?.id || '';
    const categNome = params?.nome || '';

    const cat = {id: categId, nome: categNome};
    return {props: cat};
}
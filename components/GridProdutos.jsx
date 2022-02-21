import { Grid } from "@mui/material";
import Produto from "./Produto";

const gridSpacing = 2;

const GridProdutos = ({lista}) => {
    return (
        <Grid container sx={{paddingLeft: {sm: 10}, paddingRight: {sm: 10}, marginTop: 2}} justifyContent="center" spacing={gridSpacing}>
            {lista.map(doc => {
                let dados = doc;
                let {prodName, prodValor, comissao, imgCapa, idProduto} = dados;
                return <Produto nome={prodName} valor={prodValor} comissao={comissao} img={imgCapa} id={idProduto} />
            })}
        </Grid>
    )
}

export default GridProdutos;
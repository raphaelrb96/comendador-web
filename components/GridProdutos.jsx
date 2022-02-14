import { Grid } from "@mui/material";
import Produto from "./Produto";

const gridSpacing = 3;

const GridProdutos = ({lista}) => {
    return (
        <Grid container sx={{paddingLeft: {sm: 1}, paddingRight: {sm: 1}}} justifyContent="center" spacing={gridSpacing}>
            {lista.map(doc => {
                let dados = doc;
                let {prodName, prodValor, comissao, imgCapa, idProduto} = dados;
                return <Produto nome={prodName} valor={prodValor} comissao={comissao} img={imgCapa} id={idProduto} />
            })}
        </Grid>
    )
}

export default GridProdutos;
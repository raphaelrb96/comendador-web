import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { colorPrimary } from "../utilidades/Cores";
import Quadro from "./Quadro";

const Produto = ({img, nome, valor, comissao, id}) => {
    const router = useRouter();
    return (
        <Grid item lg={3} xs={6} md={4}>
            <Card
                style={{cursor: 'pointer'}}
                onClick={() => {
                    router.push({
                        pathname: '/produtos/',
                        query: { id: id },
                    });
                }}
                sx={{  display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    style={{
                        maxHeight: 350
                    }}
                    component="img"
                    image={img}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      R$ {valor},00
                    </Typography>
                    <Typography>
                      {nome}
                    </Typography>
                </CardContent>
                <CardActions sx={{marginLeft: {sm: 1}}}>
                    
                    <Typography color={'#8f888e'}>
                        Comissão {comissao},00
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Produto;
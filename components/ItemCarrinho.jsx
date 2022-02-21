import { Avatar, IconButton, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { removeDoCarrinho } from "../services/Loja";

const ItemCarrinho = ({item}) => {
    const route = useRouter();
    const {quantidade, produtoName, idProdut, caminhoImg, valorTotalComComissao} = item;
    return (
        <Paper elevation={2}>
            
            <ListItem key={idProdut} sx={{ py: 0, px: 0, marginTop: 4 }}>
                <img style={{width: 100, height: 100, marginRight: 14}} src={caminhoImg}/>
                <ListItemText primary={`${quantidade} ${String(produtoName).substring(0, 26)}`} secondary={`R$ ${valorTotalComComissao},00`} />
                <Stack>
                    <IconButton onClick={() => route.push(`/produtos/?id=${idProdut}`)} aria-label="delete">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => removeDoCarrinho(idProdut)} aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            
            </ListItem>
        </Paper>
    )
}

export default ItemCarrinho
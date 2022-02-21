import { Box, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Fragment } from "react";

const itensPedido = item => {
    const {quantidade, produtoName, idProdut, caminhoImg, valorTotalComComissao, comissaoTotal} = item;
    return (
        <ListItem key={idProdut} sx={{ py: 2, px: 0}}>
            <ListItemText style={{marginRight: 2}} primary={String(produtoName).substring(0, 26)} secondary={`R$ ${comissaoTotal} por ${quantidade} ${quantidade > 1 ? 'unidades vendidas' : 'unidade vendida'}`} />
            <Typography component="h4" variant="body2">
                {`R$ ${valorTotalComComissao}`}
            </Typography>
        </ListItem>       
    )
}

const ItemVenda = ({pedido}) => {
    const {frete, statusCompra, pagamentoRecebido, listaDeProdutos, valorTotal, nomeCliente, adress, comissaoTotal, complemento, phoneCliente, formaDePagar} = pedido;

    let formaDePagamento = () => {
        switch(formaDePagar) {
            case 1:
                return 'Débito';
            case 4:
                return 'Dinheiro';
            case 2:
                return 'Crédito';
            default:
                return 'Pix';
        }
    };

    let status = () => {
        if(pagamentoRecebido) {
            return 'Pagamento Recebido';
        }
        switch(statusCompra) {
            case 1:
                return 'Aguardando';
            case 2:
                return 'Confirmada';
            case 3: 
                return 'Cancelada';
            case 4:
                return 'Saiu para Entrega'
            case 5:
                return 'Concluida';
            default:
                return 'Cancelada';
        }
    };

    return (
        <Fragment>
            <Box sx={{
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            marginTop: 1,
            marginBottom: 1}}>
                <Typography variant="h5" gutterBottom >
                    {status()}
                </Typography>
            </Box>
            
            <br/>
            <Grid container justifyContent="space-between" justifyItems="end" spacing={0}>
                <Grid item xs={12} sm={6}>
                    
                    <ListItem key={nomeCliente} sx={{ py: 0, px: 0}}>
                        <ListItemText style={{marginRight: 2}} primary={nomeCliente} secondary={'Nome do Cliente'} />
                    </ListItem>
                    <ListItem key={phoneCliente} sx={{ py: 0, px: 0}}>
                        <ListItemText style={{marginRight: 2}} primary={phoneCliente} secondary={'Contato'} />
                    </ListItem>
                    <ListItem key={formaDePagamento()} sx={{ py: 0, px: 0}}>
                        <ListItemText style={{marginRight: 2}} primary={formaDePagamento()} secondary={'Forma de Pagamento'} />
                    </ListItem>
                </Grid>

                <Grid item xs={12} sm={6}>
                    
                    <ListItem key={adress} sx={{ py: 0, px: 0}}>
                        <ListItemText style={{marginRight: 2}} primary={adress} secondary={'Endereço'} />
                    </ListItem>
                    <ListItem key={complemento} sx={{ py: 0, px: 0}}>
                        <ListItemText style={{marginRight: 2}} primary={complemento} secondary={'Bairro'} />
                    </ListItem>
                </Grid>
                
            </Grid>
            <br/>
            
            <List disablePadding>
                
                {listaDeProdutos.map(itensPedido)}
                <ListItem key={'092'} sx={{ py: 0, px: 0}}>
                    <ListItemText style={{marginRight: 2}} primary={'Taxa de Entrega'} />
                    <Typography component="h4" variant="body2">{`${frete === 0 ? 'Grátis' : 'R$ ' + frete}`}</Typography>
                </ListItem>
                <br/>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="TOTAL" primaryTypographyProps={{fontWeight: 'bold'}} />
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>
                        R$ {valorTotal},00
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="COMISSÃO" primaryTypographyProps={{fontWeight: 'bold'}} />
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>
                        R$ {comissaoTotal},00
                    </Typography>
                </ListItem>
            </List>

            
       </Fragment>
    )
}

export default ItemVenda;
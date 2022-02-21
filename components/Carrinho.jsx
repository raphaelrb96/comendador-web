import { List, Typography } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react"
import { getCarrinho } from "../services/Loja";
import { authListener } from "../services/Usuario";
import ItemCarrinho from "./ItemCarrinho"
import Pb from "./Pb";

const Carrinho = ({itens}) => {
    

    if(itens === undefined) {
        return <Pb />
    } else if(itens.length === 0) {
        return (
            <Typography variant="h4" style={{marginTop: 18}} align="center" color="text.secondary" component="h4">
                Nenhum produto ainda
            </Typography>
        )
    }

    return (
        <List>
            {itens.map(item => <ItemCarrinho item={item} />)}
        </List>
    )
}

export default Carrinho
import { Grid, TextField, Typography } from "@mui/material"
import { Fragment } from "react"
import { bairro, nome, phone, rua, setBairro, setNome, setPhone, setRua } from "../pages/concluir"

const FormCliente = () => {
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Informações importantes
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="firstName"
                        name="PrimeiroNome"
                        label="Nome do Cliente"
                        fullWidth
                        autoComplete="name"
                        defaultValue={nome}
                        onChange={setNome}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={setPhone}
                        key="phone"
                        id="phone"
                        name="phone"
                        label="Número pra contato"
                        fullWidth
                        defaultValue={phone}
                        autoComplete="phone"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Nome da rua"
                        onChange={setRua}
                        fullWidth
                        defaultValue={rua}
                        autoComplete="billing address-line1"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="bairro"
                        onChange={setBairro}
                        name="bairro"
                        label="Bairro"
                        required
                        defaultValue={bairro}
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        required
                        id="city"
                        name="cidade"
                        label="Cidade"
                        fullWidth
                        disabled
                        defaultValue="Manaus"
                        autoComplete="billing address-level2"
                    />
                </Grid>

                <Grid item xs={12} >
                    <TextField 
                        id="state" 
                        name="estado" 
                        label="Estado" 
                        disabled 
                        defaultValue="Amazonas" 
                        fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="País"
                        fullWidth
                        disabled
                        defaultValue="Brasil"
                        autoComplete="billing country"
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default FormCliente
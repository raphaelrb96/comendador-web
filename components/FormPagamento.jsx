import { Checkbox, createTheme, FormControlLabel, FormGroup, FormHelperText, Grid, makeStyles, styled, TextField, Typography, withStyles } from "@mui/material"
import { Fragment, useState } from "react"
import { pagamento, setPagamento, setTaxa, taxa } from "../pages/concluir";
import { colorPrimary } from "../utilidades/Cores";

function initialState() {
	switch(pagamento) {
		case 4:
			return {
				dinheiro: true,
				credito: false,
				debito: false,
				pix: false,
				forma: 4,
				taxa: taxa
			}
		case 5:
			return {
				dinheiro: false,
				credito: false,
				debito: false,
				pix: true,
				forma: 5,
				taxa: taxa
			}
		case 1:
			return {
				dinheiro: false,
				credito: false,
				debito: true,
				pix: false,
				forma: 1,
				taxa: taxa
			}
		case 2: 
			return {
				dinheiro: false,
				credito: true,
				debito: false,
				pix: false,
				forma: 2,
				taxa: taxa
			}
	}
}

export default function FormPagamento() {

	const [state, setState] = useState(initialState());


	let handleChange = name => event => {
	  	if (name === 'dinheiro' && event.target.checked) {
	  		setPagamento(4);
	  		setState((prevState) => ({
                ...prevState,
	  			credito: false,
	  			debito: false,
	  			dinheiro: true,
	  			forma: 4,
                pix: false
	  		}));
	  	} else if (name === 'debito' && event.target.checked) {
	  		setPagamento(1);
	  		setState((prevState) => ({
                ...prevState,
	  			credito: false,
	  			dinheiro: false,
	  			debito: true,
	  			forma: 1,
                pix: false
	  		}));
	  	} else if (name === 'credito' && event.target.checked) {
	  		setPagamento(2);
	  		setState((prevState) => ({
                ...prevState,
	  			debito: false,
	  			dinheiro: false,
	  			credito: true,
	  			forma: 2,
                pix: false
	  		}));

	  	} else {
            setPagamento(5);
	  		setState((prevState) => ({
                ...prevState,
	  			debito: false,
	  			dinheiro: false,
	  			credito: false,
                pix: true,
	  			forma: 5
	  		}));
        }

	};

    let changeTaxa = name => event => {
        if (name === 'gratis' && event.target.checked) {
            setTaxa(0);
            setState((prevState) => ({
                ...prevState,
                taxa: 0
            }));
            
        } else if (name === '10' && event.target.checked) {
            setTaxa(10);
            setState((prevState) => ({
                ...prevState,
                taxa: 10
            }));
        } else if (name === '20' && event.target.checked) {
            setTaxa(20);
            setState((prevState) => ({
                ...prevState,
                taxa: 20
            }));

        } else {
            setTaxa(30);
            setState((prevState) => ({
                ...prevState,
                taxa: 30
            }));
      }
    };

	let { dinheiro, debito, credito, pix, taxa } = state;

	console.log(state)

	return(

		<Fragment>

			<Typography variant="h6" gutterBottom>
		        Forma de Pagamento
		    </Typography>
		    <FormGroup>
	          <FormControlLabel
	            control={<Checkbox  checked={dinheiro} onChange={handleChange('dinheiro')} value="dinheiro" />}
	            label="Dinheiro"
	          />

              <FormControlLabel
	            control={
	              <Checkbox  checked={pix} onChange={handleChange('pix')} value="pix" />
	            }
	            label="Pix"
	          />

	          <FormControlLabel
	            control={<Checkbox  checked={debito} onChange={handleChange('debito')} value="debito" />}
	            label="Debito"
	          />
	          

	          <FormControlLabel
	            control={
	              <Checkbox  checked={credito} onChange={handleChange('credito')} value="credito" />
	            }
	            label="Crédito"
	          />
	        </FormGroup>
	        <FormHelperText>O pagamento é feito no momento da entrega</FormHelperText>
	        <br/>
            <br/>
            <Typography variant="h6" gutterBottom>
		        Taxa de Entrega
		    </Typography>
		    <FormGroup>
	          <FormControlLabel
	            control={<Checkbox  checked={taxa === 0} onChange={changeTaxa('gratis')} value="gratis" />}
	            label="Grátis"
	          />

              <FormControlLabel
	            control={
	              <Checkbox  checked={taxa === 10} onChange={changeTaxa('10')} value="10" />
	            }
	            label="R$ 10"
	          />

	          <FormControlLabel
	            control={<Checkbox  checked={taxa === 20} onChange={changeTaxa('20')} value="20" />}
	            label="R$ 20"
	          />
	          

	          <FormControlLabel
	            control={
	              <Checkbox  checked={taxa === 30} onChange={changeTaxa('30')} value="30" />
	            }
	            label="R$ 30"
	          />
	        </FormGroup>
	        <FormHelperText>Confirme os bairros com taxa no grupo de vendedores</FormHelperText>
		</Fragment>

	);

}
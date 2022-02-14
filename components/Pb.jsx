import { Box, CircularProgress } from "@mui/material"
import { colorPrimary } from "../utilidades/Cores";

const Pb = () => {
    return (
        <Box 
            style={{
                display: 'flex',
                margin: 40
            }}
            justifyContent="center"
            alignContent="center"
            alignItems="center">
            <CircularProgress style={{color: colorPrimary}} />
        </Box>
    )
}

export default Pb;
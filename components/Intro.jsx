import { Avatar, Box, Typography } from "@mui/material"
import { colorPrimary, colorPrimaryDark } from "../utilidades/Cores"
import Pb from "./Pb"

const Intro = () => {
    return (
        <div>
            <Box
                sx={{
                my: 1,
                mx: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 2
                }}
            >
                <Avatar style={{width: 180, height: 180}} sx={{  bgcolor: 'secondary.main' }}>
                    <img src="/comendador.png" style={{width: 180}} />
                </Avatar>
                <Typography fontFamily={'fantasy'} color={colorPrimaryDark} variant="h3">
                    COMENDADOR
                </Typography>
                <Pb />
            </Box>
        </div>
    )
}

export default Intro
import { AppBar, Box, Grid, IconButton, MenuItem, Toolbar, Typography } from '@mui/material'

const MyAppBar = () => {
    return (
        <div>
            <AppBar style={{backgroundColor: '#9B15F4'}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        COMENDADOR MULTIMARCAS
                    </Typography>
                    <Box style={{flexGrow: 1}} />
                    <Box>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <MonetizationOnIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MyAppBar
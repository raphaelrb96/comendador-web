import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';

const Header = ({ sections, title }) => {

    const route = useRouter();

    return (
        <>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>

                <Button href={'/'} size="small" style={{color: '#9B15F4'}}>
                    Minha Conta
                </Button>

                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1, fontSize: { xs: 0, sm: 20 } }}
                >
                    {title}
                </Typography>

                <IconButton>
                    <ShoppingCartIcon />
                </IconButton>

                <Button href={'/'} variant="outlined" style={{color: '#9B15F4', borderColor: '#9B15F4'}} size="small">
                    Carrinho
                </Button>
            </Toolbar>

            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    href={section.url}
                    onClick={() => {
                        route.prefetch(section.url)
                    }}
                    sx={{ p: 1, flexShrink: 0 }}
                    underline="none"
                >
                    {section.title}
                </Link>
                ))}
            </Toolbar>
        </>
    )
}

export default Header;
import * as React from 'react';
import styles from './dashboardheader.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation'

import SettingsIcon from '@mui/icons-material/Settings';


function DashboardHeader({ user, error, isLoading, title }) {
    const router = useRouter()

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' },
            height: '100px',
            backgroundColor: '#1A1A1A',
            boxShadow: 'none'
        }}>
            <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'></link>
            <Container maxWidth={false} disableGutters sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>

                {/* Laptop */}
                <Toolbar disableGutters sx={{
                    width: '100%',
                    marginLeft: '30px',
                    marginRight: '30px'
                }}>
                    <Box className={styles.headerItems}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                fontFamily: 'DM Sans',
                                fontWeight: 1000,
                                fontSize: '30px',
                                // letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                // marginLeft: '30px',
                                display: { xs: 'none', md: 'flex' }
                            }}
                        >
                            {title}
                        </Typography>

                        <Link 
                        href={'/settings'}
                        color={'#fff'} 
                        className={styles.settingsIcon}
                        >
                            <SettingsIcon fontSize='large' />
                        </Link>
                    </Box>




                    {/* Phone */}

                    <Box className={styles.mobileLogoContainer}>
                        <Box
                            component="a"
                            href='/'
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                alignItems: 'center',
                                height: '68px'
                            }}>
                            {/* <Image
                                priority
                                src={logo}
                                alt="logo"
                                height={50}
                                width={50}
                            /> */}
                        </Box >
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                fontFamily: 'DM Sans',
                                fontWeight: 1000,
                                fontSize: '25px',
                                // letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginLeft: '10px',
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>

                    {/* <Box sx={{
                        flexGrow: 1, display: { xs: 'flex', md: 'none' },
                        justifyContent: 'end'
                    }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiPaper-root': {
                                    backgroundColor: '#010725',
                                    border: '1px solid white',
                                    color: 'white'
                                },
                            }}
                        >
                        </Menu>
                    </Box> */}

                    {/* Laptop */}
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingLeft: '10px' }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: 'white', display: 'block', fontSize: '16px', fontFamily: 'DM Sans',
                                    letterSpacing: '.3rem', marginRight: '5px',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        textDecorationThickness: '2px',
                                        textDecorationOffset: '10px',
                                    }
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box> */}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default DashboardHeader;
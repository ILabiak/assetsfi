import React, { useState, useEffect, use } from 'react';
import styles from './header.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation'

import Image from 'next/image';
import logo from '@/public/logo.svg';

const pages = ['HOME', 'ABOUT', 'CONTACT US'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header({ user, error, isLoading }) {
    const router = useRouter()

    const [userData, setUserData] = useState();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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

    const fetchUserMetadata = async () => {
        try {
            const response = await fetch(`/api/server/user/metadata`);
            if (response.status === 200) {
                const data = await response.json();
                setUserData(data)
            } else {
                setUserData({})
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting user metadatadata', error);
        }
    }

    useEffect(() => {
        fetchUserMetadata().catch(console.error)
    }, []);

    return (
        <AppBar position="static" sx={{
            backgroundColor: '#010725'
            , boxShadow: 'none'
        }}>
            <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'></link>
            <Container maxWidth="xl" >

                {/* Laptop */}
                <Toolbar disableGutters>
                    <Box
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            height: '132px'
                        }}>
                        <Image
                            priority
                            src={logo}
                            alt="logo"
                            height={70}
                            width={70}
                        />
                    </Box >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            fontFamily: 'DM Sans',
                            fontWeight: 1000,
                            fontSize: '16px',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: '10px',
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        AssetsFi
                    </Typography>


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
                            <Image
                                priority
                                src={logo}
                                alt="logo"
                                height={50}
                                width={50}
                            />
                        </Box >
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                fontFamily: 'DM Sans',
                                fontWeight: 1000,
                                fontSize: '16px',
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginLeft: '10px',
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            AssetsFi
                        </Typography>
                    </Box>


                    <Box sx={{
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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Laptop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingLeft: '10px' }}>
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
                    </Box>

                    <div>
                        {(!isLoading && userData) ? (
                            <div>
                                {
                                    !userData?.name ? (
                                        <Box sx={{ display: 'flex', flexGrow: 0, flexDirection: 'row', }}>
                                            <Button className={styles.loginButton} href='/api/auth/login'
                                                sx={{
                                                    backgroundColor: '#0328EE',
                                                    color: 'white',
                                                    fontFamily: 'DM Sans',
                                                    fontSize: '16px',
                                                    borderRadius: '80px',
                                                    marginRight: '20px',
                                                    display: { xs: 'none', md: 'flex' }
                                                }}>
                                                LOGIN
                                            </Button>
                                            <Button className={styles.signupButton}
                                                href='/api/auth/signup'
                                                sx={{
                                                    backgroundColor: '#323232',
                                                    color: 'white',
                                                    fontFamily: 'DM Sans',
                                                    fontSize: '16px',
                                                    borderRadius: '80px',
                                                    display: { xs: 'none', md: 'flex' }
                                                }}>
                                                SIGN UP
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box sx={{ flexGrow: 0 }}>
                                            {/* <Tooltip title="Open settings"> */}
                                            <IconButton onClick={handleOpenUserMenu} sx={{
                                                p: 0,
                                                border: '2px solid white'
                                            }}>
                                                <Avatar alt={userData?.nickname} src={userData?.picture} />
                                            </IconButton>
                                            {/* </Tooltip> */}
                                            <Menu
                                                sx={{
                                                    mt: { xs: '55px', md: '0' },
                                                    ml: { xs: '0', md: '-50px' },
                                                    '& .MuiPaper-root': {
                                                        backgroundColor: '#010725',
                                                        border: '1px solid white',
                                                        borderRadius: '10px',
                                                        color: 'white'
                                                    },
                                                    // borderRadius: '80px'
                                                }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                            >
                                                <MenuItem key='usermail'>
                                                    <Typography textAlign="center">{userData?.nickname}</Typography>
                                                </MenuItem>
                                                <MenuItem key='dashboard' onClick={() => router.push('/dashboard')} >
                                                    <Typography textAlign="center">Dashboard</Typography>
                                                </MenuItem>
                                                <MenuItem key='logout' onClick={() => router.push('/api/auth/logout')}>
                                                    <Typography textAlign="center">Log out</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    )
                                }
                            </div>
                        ) : (
                            <div></div>
                        )
                        }
                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
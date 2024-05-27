import * as React from 'react';
import styles from './sidebar.module.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './SidebarTheme';
import {
    Box, SwipeableDrawer, List, ListItem, ListItemButton, ListItemIcon,
    Link, Typography, Divider, IconButton
} from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation'

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SvgIcon from "@mui/material/SvgIcon";
import WalletIcon from '@mui/icons-material/Wallet';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import logo from '@/public/logo.svg';


const MobileSidebar = ({ drawerOpen, setDrawerOpen }) => {
    const pathname = usePathname()

    const sidebarPages = [
        { text: 'Portfolios', icon: <WalletIcon />, active: pathname == '/portfolios' ? true : false, href: '/portfolios' },
        { text: 'Donations', icon: <VolunteerActivismIcon />, active: pathname == '/donations' ? true : false, href: '/donations' },
        {
            text: 'Binance Spot', icon: <SvgIcon sx={{
                color: pathname == '/binance' ? 'white' : '#AEAEAE',
                '& path': {
                    fill: 'currentColor',
                }
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" strokeWidth={1.5} stroke="currentColor" id="Binance"><path
                    fill="#ffffff"
                    d="M14.6782 20.1697L23.9997 10.8486 33.3262 20.1746 38.7501 14.7507 23.9997 0 9.25428 14.7458 14.6782 20.1697zM10.8479 23.9988L5.42408 18.575 0 23.9991 5.42381 29.4229 10.8479 23.9988zM23.9997 37.1507L14.6782 27.8296 9.24634 33.2463 23.9997 47.9993 38.7501 33.2489 38.7527 33.2459 33.3258 27.825 23.9997 37.1507zM42.5759 29.4254L48 24.0014 42.5762 18.5775 37.1521 24.0016 42.5759 29.4254z"
                    className="color000000 svgShape"></path>
                    <path fill="#ffffff" d="M29.5036 23.9968H29.5013L29.5063 23.9995L29.5036 24.0025L23.9997 29.5064L18.5008 24.0074L18.4932 23.9995L23.9997 18.4929L29.5036 23.9968Z" className="color000000 svgShape"></path>
                </svg>
            </SvgIcon>, active: pathname == '/binance' ? true : false, href: '/binance'
        },
        { text: 'Settings', icon: <SettingsIcon />, active: pathname == '/settings' ? true : false, href: '/settings' },]
    return (
        <ThemeProvider theme={theme}>
            <SwipeableDrawer
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    width: '70vw',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '70vw',
                    },

                }}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={(() => setDrawerOpen(true))}
                anchor="right"
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Link href={'/'} variant='logo' >
                            <Image
                                priority
                                src={logo}
                                alt="logo"
                                height={50}
                                width={50}
                            />
                            <Typography variant='logo1' noWrap >
                                AssetsFi
                            </Typography>
                        </Link>
                        <IconButton
                            size="large"
                            aria-label="Menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            color="inherit"
                            sx={{ paddingRight: '20px'}}
                        >
                            <MenuIcon fontSize='large' sx={{
                                color: 'white'
                            }} />
                        </IconButton>
                    </Box>


                    <Divider
                    />
                    <List>
                        {sidebarPages.map((item, index) => (
                            <ListItem key={item.text} >
                                <Link
                                    variant='default'
                                    href={item.href}>
                                    <ListItemButton className={styles.listItem} selected={item.active}>
                                        <ListItemIcon sx={{
                                            color: item.active ? 'white' : '#AEAEAE',
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <Typography sx={{
                                            fontSize: '20px',
                                            fontFamily: 'DM Sans',
                                            color: item.active ? 'white' : '#AEAEAE',
                                        }}>
                                            {item.text}
                                        </Typography>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Divider sx={{
                        alignSelf: 'center',
                        backgroundColor: '#AEAEAE',
                        width: '80%'
                    }} />
                    <List>
                        <ListItem key='logout'>
                            <Link
                                variant='default'
                                href={'/api/auth/logout'}
                            >
                                <ListItemButton className={styles.listItem}>
                                    <ListItemIcon sx={{ color: '#AEAEAE', }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <Typography sx={{
                                        fontSize: '20px',
                                        fontFamily: 'DM Sans',
                                        color: '#AEAEAE'
                                    }}>
                                        Log Out
                                    </Typography>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </SwipeableDrawer>
        </ThemeProvider>
    );
}

export default MobileSidebar
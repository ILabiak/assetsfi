import * as React from 'react';
import styles from './sidebar.module.css';
import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
    Link, Typography, Divider
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import WindowIcon from '@mui/icons-material/Window';
import SvgIcon from "@mui/material/SvgIcon";
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import WalletIcon from '@mui/icons-material/Wallet';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation'


import logo from '@/public/logo.svg';

const drawerWidth = 260;


const LaptopSidebar = React.memo(() => {
    const router = useRouter();
    const pathname = usePathname()

    const sidebarPages = [{ text: 'Home', icon: <WindowIcon />, active: pathname == '/dashboard' ? true : false, href: '/dashboard' },
    { text: 'Portfolios', icon: <WalletIcon />, active: pathname == '/portfolios' ? true : false, href: '/portfolios' },
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
                class="color000000 svgShape"></path>
                <path fill="#ffffff" d="M29.5036 23.9968H29.5013L29.5063 23.9995L29.5036 24.0025L23.9997 29.5064L18.5008 24.0074L18.4932 23.9995L23.9997 18.4929L29.5036 23.9968Z" class="color000000 svgShape"></path>
            </svg>
        </SvgIcon>, active: pathname == '/binance' ? true : false, href: '/binance'
    }]
    return (
        <Drawer
            sx={{
                display: { xs: 'none', md: 'flex' },
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: 'black',
                    justifyContent: 'space-between'
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Link
                    href={'/'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        textAlign: 'center',
                        marginLeft: '30px',
                        height: '100px',
                        textDecoration: 'none'
                    }}>
                    <Image
                        priority
                        src={logo}
                        alt="logo"
                        height={50}
                        width={50}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            fontFamily: 'DM Sans',
                            fontWeight: 1000,
                            fontSize: '16px',
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            textAlign: 'center',
                            marginLeft: '10px',
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        AssetsFi
                    </Typography>
                </Link>

                <Divider sx={{
                    alignSelf: 'center',
                    backgroundColor: '#AEAEAE',
                    width: '80%'
                }} />
                <List>
                    {sidebarPages.map((item, index) => (
                        <ListItem key={item.text} >
                            <Link
                                sx={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    width: '100%'
                                }}
                                href={item.href}>
                                <ListItemButton className={styles.listItem} selected={item.active}
                                    sx={{
                                        borderRadius: '5px',
                                        "&.Mui-selected": {
                                            backgroundColor: "#0328EE"
                                        },
                                        "&.Mui-selected:hover": {
                                            backgroundColor: "#010D50"
                                        },
                                        "&.Mui-focusVisible": {
                                            backgroundColor: "#010D50"
                                        },
                                        "&:hover": {
                                            backgroundColor: "#010D50",
                                            "& svg": {
                                                color: "white"
                                            },
                                            "& p": {
                                                color: "white"
                                            }
                                        }

                                    }}>
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
                            sx={{
                                textDecoration: 'none',
                                display: 'flex',
                                width: '100%'
                            }}
                            href={'/api/auth/logout'}>
                            <ListItemButton className={styles.listItem}
                                sx={{
                                    borderRadius: '5px',
                                    "&.Mui-selected": {
                                        backgroundColor: "#0328EE"
                                    },
                                    "&.Mui-selected:hover": {
                                        backgroundColor: "#010D50"
                                    },
                                    "&.Mui-focusVisible": {
                                        backgroundColor: "#010D50"
                                    },
                                    "&:hover": {
                                        backgroundColor: "#010D50",
                                        "& svg": {
                                            color: "white"
                                        },
                                        "& p": {
                                            color: "white"
                                        }
                                    }
                                }}>
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

        </Drawer>
    );
})

export default LaptopSidebar
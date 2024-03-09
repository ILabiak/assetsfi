import * as React from 'react';
import styles from './sidebar.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import WindowIcon from '@mui/icons-material/Window';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import WalletIcon from '@mui/icons-material/Wallet';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import logo from '@/public/logo.svg';

const drawerWidth = 260;

export default function Sidebar() {
    const router = useRouter();

    return (
        <Drawer
            sx={{
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
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    textAlign: 'center',
                    marginLeft: '30px',
                    height: '100px'
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
                        href=""
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
                </Box>

                <Divider sx={{
                    alignSelf: 'center',
                    backgroundColor: '#AEAEAE',
                    width: '80%'
                }} />
                <List>
                    {[{ text: 'Home', icon: <WindowIcon />, active: true },
                    { text: 'Transactions', icon: <SwapVerticalCircleIcon />, active: false },
                    { text: 'Portfolios', icon: <WalletIcon />, active: false }].map((item, index) => (
                        <ListItem key={item.text} >
                            <ListItemButton className={styles.listItem} selected={item.active} sx={{
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
                        <ListItemButton onClick={() => {router.push('/api/auth/logout')}} className={styles.listItem} sx={{
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
                            <ListItemIcon sx={{ color: '#AEAEAE' }}>
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
                    </ListItem>
                </List>
            </Box>

        </Drawer>

    );
}
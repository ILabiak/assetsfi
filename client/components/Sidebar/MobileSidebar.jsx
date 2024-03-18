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
import { usePathname } from 'next/navigation'

const drawerHight = 90;


const MobileSidebar = React.memo(() => {
    const router = useRouter();
    const pathname = usePathname()

    const sidebarPages = [{ text: 'Home', icon: <WindowIcon />, active: pathname == '/dashboard' ? true : false, href: '/dashboard' },
    // { text: 'Transactions', icon: <SwapVerticalCircleIcon />, active: pathname == '/transactions' ? true : false, href: '/transactions' },
    { text: 'Portfolios', icon: <WalletIcon />, active: pathname == '/portfolios' ? true : false, href: '/portfolios' },
    { text: 'Log out', icon: <WalletIcon />, active: false, href: '/api/auth/logout' }]
    return (
        <Drawer
            sx={{
                display: { xs: 'flex', md: 'none' },
                height: drawerHight,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    height: drawerHight,
                    boxSizing: 'border-box',
                    backgroundColor: 'black',
                    justifyContent: 'center'
                },
            }}
            variant="permanent"
            anchor="bottom"
        >
            <List disablePadding sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                {sidebarPages.map((item, index) => (
                    <ListItem sx={{
                        padding: '5px'
                    }} key={item.text} >
                        <ListItemButton className={styles.listItem} selected={item.active}
                            onClick={() => router.push(item.href)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px 5px',
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
                                },
                                "& .MuiListItemIcon-root": {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }

                            }}>
                            <ListItemIcon sx={{
                                color: item.active ? 'white' : '#AEAEAE',
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'DM Sans',
                                color: item.active ? 'white' : '#AEAEAE',
                            }}>
                                {item.text}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
})

export default MobileSidebar
import * as React from 'react';
import styles from './header.module.css';
import { AppBar, Box, Toolbar, Typography, Container, Link, IconButton, Menu, MenuItem } from '@mui/material';
import MobileSidebar from '@/components/Sidebar/MobileSidebar'

import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';


function DashboardHeader({ title }) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

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
                        marginRight: '30px',
                        display: { xs: 'none', md: 'inline' }
                    }}>

                        <Box>
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
                                        color: 'inherit',
                                        textDecoration: 'none',
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
                        </Box>



                    </Toolbar>

                    {/* Phone */}
                    <Toolbar disableGutters sx={{
                        width: '100%',
                        // marginLeft: '30px',
                        // marginRight: '30px',r
                        display: { xs: 'inline', md: 'none' }
                    }}>
                        <Box className={styles.mobileLogoContainer}>
                            <Box
                                component="a"
                                href='/'
                                sx={{
                                    mr: 2,
                                    alignItems: 'center',
                                    height: '68px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
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
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    marginLeft: '10px',
                                }}
                            >
                                {title}
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end', paddingRight: '10px' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="Menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={()=>setDrawerOpen(!drawerOpen)}
                                    color="inherit"
                                >
                                    <MenuIcon fontSize='large' />
                                </IconButton>
                                <MobileSidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    );
}
export default DashboardHeader;
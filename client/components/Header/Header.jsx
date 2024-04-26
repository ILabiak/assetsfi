import * as React from 'react';
import styles from './header.module.css';
import { AppBar, Box, Toolbar, Typography, Container, Link } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

function DashboardHeader({ title }) {

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
                                color: 'inherit',
                                textDecoration: 'none',
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
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default DashboardHeader;
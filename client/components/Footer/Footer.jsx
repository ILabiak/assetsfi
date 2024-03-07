import * as React from 'react';
import styles from './footer.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logo from '@/public/logo.svg';


function Footer() {

    return (
        <Paper sx={{
            position: 'default',
            bottom: 0,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: '#010725',
            height: '132px'
        }} component="footer" square variant="outlined">
            <Box className={styles.footerContainter} sx={{
                marginLeft: { xs: '10px', md: '100px' },
                marginRight: { xs: '10px', md: '100px' }
            }}>
                <Typography sx={{
                    fontSize: { md: '20px' },
                    fontFamily: 'DM Sans, sans-serif',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '10px'
                }}>All rights reserved</Typography>
                <Box className={styles.logoContainer} sx={{

                }}>
                    <Box
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            // display: { xs: 'none', md: 'flex' },
                            display: 'flex',
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
                            fontSize: '20px',
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            marginLeft: '10px',
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        AssetsFi
                    </Typography>
                </Box>

            </Box>
        </Paper>
    );
}
export default Footer;
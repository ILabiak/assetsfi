import * as React from 'react';
import styles from './mainfeatures.module.css';
import { Box, Typography, Grid } from '@mui/material';
import Feature from '@/components/HomePage/Feature/Feature';

import securityIcon from '@/public/secure.svg'
import freeIcon from '@/public/free.svg'
import exchangeIcon from '@/public/exchange.svg'
import walletIcon from '@/public/wallet.svg'


function MainFeatures() {

    return (
        <Box className={styles.main} sx={{
            marginTop: { xs: '0px', md: '100px' },
        }}>
            <Box sx={{ width: '100vw' }} className={styles.featuresContainer}>
                <Box className={styles.featuresWrap} sx={{
                    marginLeft: { xs: '20px', md: '100px' },
                    marginRight: { xs: '20px', md: '100px' }
                }}>
                    <Typography sx={{
                        fontSize: { xs: '40px', md: '60px' },
                        fontFamily: 'DM Sans',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        Main Features
                    </Typography>
                    <Grid container spacing={5} columnSpacing={5}>
                        <Grid item xs={12} md={6}>
                            <Feature icon={freeIcon} title={'FREE TO USE'}
                                text={'We provide free access to all our features. We don\'t demand any fees for using our website.'}></Feature>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Feature icon={exchangeIcon} title={'EXCHANGE INTEGRATION'}
                                text={'You can trade your cryptocurrencies directly on our website using Binance API. More exchanges coming soon...'}></Feature>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Feature icon={walletIcon} title={'100+ ASSETS SUPPORTED'}
                                text={'We support all popular cryptocurrencies and provide up to date statistics.'}></Feature>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Feature icon={securityIcon} title={'SECURE'}
                                text={'We encrypt all your data and private API keys so your funds and data are always safe and only you can access them'}></Feature>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </Box>
    );
}
export default MainFeatures;
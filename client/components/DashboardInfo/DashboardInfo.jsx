import React, { useState, useEffect } from 'react';
import styles from './dashboardinfo.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import { MiniChart } from "react-ts-tradingview-widgets";
const MiniChartNoSSR = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.MiniChart), { ssr: false });


function DashboardInfo({ user, error, isLoading }) {

    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` }, 
            ml: { xs: '0', md: '260px' }, // sidebar width
            height: { xs: `100vh`, md: `calc(100vh - 100px)` }, 
            mt: { xs: '0px', md: '100px' } // header hight
        }}>
            <Box className={styles.cryptoStatsContainer}>
                <Grid container columnSpacing={2} spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Box className={styles.miniStat}>
                            <MiniChartNoSSR colorTheme="dark" symbol='BTCUSDT' isTransparent='true' autosize='true' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box className={styles.miniStat}>
                            <MiniChartNoSSR colorTheme="dark" symbol='ETHUSDT' isTransparent='true' autosize='true' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box className={styles.miniStat}>
                            <MiniChartNoSSR colorTheme="dark" symbol='NASDAQ:AAPL' isTransparent='true' autosize='true' />
                        </Box>
                    </Grid>
                </Grid>


            </Box>
        </Box>
    );
}
export default DashboardInfo;
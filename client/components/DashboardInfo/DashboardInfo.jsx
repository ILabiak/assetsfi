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
            width: `calc(100% - 260px)`, ml: '260px', // sidebar width
            height: `calc(100vh - 100px)`, mt: '100px'
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
                            <MiniChartNoSSR colorTheme="dark" symbol='AAPLUSD' isTransparent='true' autosize='true' />
                        </Box>
                    </Grid>
                </Grid>


            </Box>
        </Box>
    );
}
export default DashboardInfo;
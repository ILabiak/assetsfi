import React, { useState, useEffect } from 'react';
import styles from './totalbinanceinfo.module.css';
import { Typography, Box, Grid } from '@mui/material';
import MiniStats from '@/components/MiniStats/MiniStats';

function TotalBinanceInfo({ totalData, handlePortfolioChange, singlePortfolio }) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box className={styles.totalPotrfolioStats}>
                <Grid container columnSpacing={4} spacing={1}>
                    <Grid item xs={12} md={6}>
                        <MiniStats title={'Total Binance Spot Value'} percentage={''} value={`${totalData?.totalValue.toFixed(2)} ${totalData['Currency']?.symbol || "$"}`} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MiniStats title={'Daily Gain'} percentage={isNaN(totalData?.dailyChangePercentage) ? '' : `${totalData?.dailyChangePercentage} %`} value={`${totalData?.dailyChange.toFixed(2)} ${totalData['Currency']?.symbol || "$"}`} />
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );
}
export default TotalBinanceInfo;
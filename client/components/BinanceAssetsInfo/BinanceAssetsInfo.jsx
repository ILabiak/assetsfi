import React, { useState, useEffect, use } from 'react';
import styles from './binanceassetsinfo.module.css';
import { Button, Typography, Box, } from '@mui/material';
import TotalBinanceInfo from '@/components/TotalBinanceInfo/TotalBinanceInfo'
import BinanceAssetsTable from '@/components/BinanceAssetsTable/BinanceAssetsTable'


function BinanceAssetsInfo({ assetsInfo }) {

    return (
        <Box className={styles.main}>
            <Box className={styles.totalData}>
                <TotalBinanceInfo totalData={assetsInfo} />
                <BinanceAssetsTable binanceAssets={assetsInfo?.assets} />
            </Box>

        </Box>
    )
}
export default BinanceAssetsInfo;
import React, { useState, useEffect, use } from 'react';
import styles from './binanceassetsinfo.module.css';
import { Button, Typography, Box, } from '@mui/material';
import TotalBinanceInfo from '@/components/TotalBinanceInfo/TotalBinanceInfo'
import BinanceAssetsTable from '@/components/BinanceAssetsTable/BinanceAssetsTable'
import BinanceDeleteButton from '@/components/BinanceDeleteButton/BinanceDeleteButton'


function BinanceAssetsInfo({ assetsInfo, handleChange }) {

    return (
        <Box className={styles.main}>
            <Box className={styles.totalData}>
                <TotalBinanceInfo totalData={assetsInfo} />
                <BinanceAssetsTable binanceAssets={assetsInfo?.assets} />
                <BinanceDeleteButton handleBinanceChange={handleChange} />
            </Box>

        </Box>
    )
}
export default BinanceAssetsInfo;
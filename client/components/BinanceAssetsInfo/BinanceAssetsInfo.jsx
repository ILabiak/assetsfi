import React, { useState, useEffect, use } from 'react';
import styles from './binanceassetsinfo.module.css';
import { Button, Typography, Box, } from '@mui/material';
import TotalBinanceInfo from '@/components/TotalBinanceInfo/TotalBinanceInfo'
import BinanceAssetsTable from '@/components/BinanceAssetsTable/BinanceAssetsTable'
import BinanceDeleteButton from '@/components/BinanceDeleteButton/BinanceDeleteButton'
import BinanceDataTitle from '@/components/BinanceDataTitle/BinanceDataTitle'


function BinanceAssetsInfo({ assetsInfo, handleChange }) {
    const [valuesHidden, setValuesHidden] = useState(false)

    return (
        <Box className={styles.main}>
            <Box className={styles.totalData}>
                <BinanceDataTitle
                    valuesHidden={valuesHidden}
                    setValuesHidden={setValuesHidden}
                    handleChange={handleChange}
                />
                <TotalBinanceInfo
                    totalData={assetsInfo}
                    valuesHidden={valuesHidden}
                />
                <BinanceAssetsTable
                    binanceAssets={assetsInfo?.assets}
                    valuesHidden={valuesHidden}
                    handleChange={handleChange}
                />
            </Box>

        </Box>
    )
}
export default BinanceAssetsInfo;
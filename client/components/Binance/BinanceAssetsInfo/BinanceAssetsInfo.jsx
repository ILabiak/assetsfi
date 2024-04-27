import React, { useState } from 'react';
import styles from './binanceassetsinfo.module.css';
import { Box } from '@mui/material';
import TotalBinanceInfo from '@/components/Binance/TotalBinanceInfo/TotalBinanceInfo'
import BinanceAssetsTable from '@/components/Binance/BinanceAssetsTable/BinanceAssetsTable'
import BinanceDataTitle from '@/components/Binance/BinanceDataTitle/BinanceDataTitle'


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
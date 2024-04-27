import React, { useState, useEffect } from 'react';
import styles from './binancedatatitle.module.css';
import { Typography, Box, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BinanceDeleteButton from '@/components/Binance/BinanceDeleteButton/BinanceDeleteButton'


function BinanceDataTitle({ valuesHidden, setValuesHidden, handleChange }) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box className={styles.totalBinanceTitleInfoContainer}>
                <Box className={styles.totalBinanceTitleValueInfo}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Typography sx={{
                            fontFamily: 'DM Sans',
                            fontSize: '24px',
                            color: '#AEAEAE',
                            textDecoration: 'none',
                        }}>{'Binance Spot Wallet Overview'}</Typography>
                    </Box>
                </Box>

                <Box className={styles.createButtonContainer}>
                    {
                        valuesHidden ? (
                            <VisibilityOffIcon
                                onClick={() => { setValuesHidden(false) }}
                                sx={{
                                    color: '#AEAEAE',
                                    fontSize: '20px',
                                    marginRight: '20px',
                                    cursor: 'pointer',
                                }} />
                        ) : (
                            <VisibilityIcon
                                onClick={() => { setValuesHidden(true) }}
                                sx={{
                                    color: '#AEAEAE',
                                    fontSize: '20px',
                                    marginRight: '20px',
                                    cursor: 'pointer',
                                }} />
                        )
                    }
                    {/* <CreateTransactionButton currency={totalData['Currency']} portfolio={totalData} handleTransactionsChange={handlePortfolioChange} /> */}
                    <BinanceDeleteButton handleBinanceChange={handleChange} />
                </Box>

            </Box>
        </Box>

    );
}
export default BinanceDataTitle;
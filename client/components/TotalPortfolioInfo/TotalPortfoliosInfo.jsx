import React, { useState, useEffect } from 'react';
import styles from './totalportfolioinfo.module.css';
import CreatePortfolioButton from '@/components/CreatePortfolioButton/CreatePortfolioButton';
import CreateTransactionButton from '@/components/CreateTransactionButton/CreateTransactionButton'
import { Typography, Box, Grid } from '@mui/material';
import MiniStats from '@/components/MiniStats/MiniStats';
import { useRouter } from 'next/navigation'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function TotalPortfoliosInfo({ totalData, handlePortfolioChange, singlePortfolio }) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box className={styles.totalPortfoliosInfoContainer}>
                <Box className={styles.totalPortfoliosValueInfo}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Typography sx={{
                            fontFamily: 'DM Sans',
                            fontSize: '16px',
                            color: '#AEAEAE',
                            textDecoration: 'none',
                        }}>{singlePortfolio ? 'Total Portfolio Value' : 'Total Portfolios Value'}</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Typography sx={{
                                fontFamily: 'DM Sans',
                                fontWeight: 1000,
                                fontSize: '30px',
                                color: 'white',
                                textDecoration: 'none',
                            }}>{`${totalData?.totalValue.toFixed(2)} ${totalData['Currency']?.symbol || "$"}`}</Typography>
                            {!isNaN(totalData?.totalChangePercentage) &&
                                <Box className={styles.percentChange}>
                                    <Typography sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'DM Sans',
                                        fontSize: '16px',
                                        color: (parseFloat(totalData?.totalChangePercentage) > 0) ? '#35b17f' : '#E85E5E',
                                        textDecoration: 'none',
                                        marginLeft: '5px'
                                    }}>
                                        {
                                            totalData?.totalChangePercentage && ((parseFloat(totalData?.totalChangePercentage) > 0) ?
                                                <TrendingUpIcon sx={{
                                                    color: '#35b17f',
                                                    marginRight: '5px'
                                                }} /> :
                                                <TrendingDownIcon sx={{
                                                    color: '#E85E5E',
                                                    marginRight: '5px'
                                                }} />)
                                        }
                                        {totalData?.totalChangePercentage || ''}</Typography>
                                </Box>
                            }

                        </Box>
                    </Box>
                </Box>

                {singlePortfolio ? <Box className={styles.createButtonContainer}>
                    <VisibilityIcon sx={{
                        color: '#AEAEAE',
                        fontSize: '20px',
                        marginRight: '20px'
                    }} />
                    {/* <CreatePortfolioButton handlePortfoliosChange={handlePortfoliosChange} /> */}
                    <CreateTransactionButton currency={totalData['Currency']} portfolio={totalData} handleTransactionsChange={handlePortfolioChange} />
                </Box> :
                    <Box className={styles.createButtonContainer}>
                        <VisibilityIcon sx={{
                            color: '#AEAEAE',
                            fontSize: '20px',
                            marginRight: '20px'
                        }} />
                        <CreatePortfolioButton handlePortfoliosChange={handlePortfolioChange} portfolio={totalData} />
                    </Box>
                }
            </Box>

            <Box className={styles.totalPotrfolioStats}>
                <Grid container columnSpacing={4} spacing={1}>
                    <Grid item xs={12} md={4}>
                        <MiniStats title={'Daily Gain'} percentage={isNaN(totalData?.dailyChangePercentage) ? '' : `${totalData?.dailyChangePercentage} %`} value={`${totalData?.dailyChange.toFixed(2)} ${totalData['Currency']?.symbol || "$"}`} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MiniStats title={'Total Gain'} percentage={isNaN(totalData?.totalChangePercentage) ? '' : `${totalData?.totalChangePercentage} %`} value={`${totalData?.totalChange.toFixed(2)} ${totalData['Currency']?.symbol || "$"}`} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MiniStats title={'Total Invested'} percentage={''} value={`${totalData?.totalInvested.toFixed(2)} ${totalData['Currency']?.symbol || "$"}`} />
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );
}
export default TotalPortfoliosInfo;
import React, { useState, useEffect } from 'react';
import styles from './portfoliosinfo.module.css';
import CreatePortfolioButton from '@/components/CreatePortfolioButton/CreatePortfolioButton';
import { Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function TotalPortfoliosInfo({ value, percentage }) {

    return (
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
                    }}>Total Portfolios Value</Typography>
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
                        }}>{value}</Typography>
                        <Box className={styles.percentChange}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontFamily: 'DM Sans',
                                fontSize: '16px',
                                color: (parseFloat(percentage) > 0) ? '#35b17f' : '#E85E5E',
                                textDecoration: 'none',
                                marginLeft: '5px'
                            }}>
                                {
                                    percentage && ((parseFloat(percentage) > 0) ?
                                        <TrendingUpIcon sx={{
                                            color: '#35b17f',
                                            marginRight: '5px'
                                        }} /> :
                                        <TrendingDownIcon sx={{
                                            color: '#E85E5E',
                                            marginRight: '5px'
                                        }} />)
                                }
                                {percentage}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className={styles.createButtonContainer}>
                <VisibilityIcon sx={{
                    color: '#AEAEAE',
                    fontSize: '20px',
                    marginRight: '20px'
                }} />
                <CreatePortfolioButton/>
            </Box>
        </Box>


    );
}
export default TotalPortfoliosInfo;
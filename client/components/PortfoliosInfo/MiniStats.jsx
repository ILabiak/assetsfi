import React, { useState, useEffect } from 'react';
import styles from './portfoliosinfo.module.css';
import {Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';



function MiniStats({ title, percentage, value }) {

    return (
        <Box className={styles.miniStats} >
            <Box className={styles.upperText}>
                <Typography sx={{
                    display: 'flex',
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    color: '#AEAEAE',
                    textDecoration: 'none',
                    alignItems: 'center'
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    display: 'flex',
                    fontFamily: 'DM Sans',
                    // fontWeight: 1000,
                    fontSize: '16px',
                    color: (parseFloat(percentage) > 0) ? '#35b17f' : '#E85E5E',
                    textDecoration: 'none',
                    alignItems: 'center'
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
                    {percentage}
                </Typography>
            </Box>
            <Box className={styles.lowerText}>
                <Typography sx={{
                    fontFamily: 'DM Sans',
                    fontWeight: 1000,
                    fontSize: '20px',
                    color: 'white',
                    textDecoration: 'none',
                }}>{value}</Typography>
            </Box>
        </Box >

    );
}
export default MiniStats;
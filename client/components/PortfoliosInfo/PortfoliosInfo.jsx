import React, { useState, useEffect } from 'react';
import styles from './portfoliosinfo.module.css';
import MiniStats from './MiniStats';
import TotalPortfoliosInfo from './TotalPortfoliosInfo';
import PortfoliosList from './PortfoliosList';
import { Button, Typography, Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function PortfoliosInfo({ user, error, isLoading }) {

    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' }, // sidebar width
            minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
            mt: { xs: '0px', md: '100px' } // header hight
        }}>
            <TotalPortfoliosInfo value={'13 324,32 $'} percentage={'12,35 %'} />

            <Box className={styles.totalPotrfolioStats}>
                <Grid container columnSpacing={4} spacing={1}>
                    <Grid item xs={12} md={4}>
                        <MiniStats title={'Daily Gain'} percentage={'2.28%'} value={'332,75 $'} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MiniStats title={'Total Gain'} percentage={'-68.5%'} value={'12 632,21 $'} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MiniStats title={'Total Invested'} percentage={''} value={'23 451,15 $'} />
                    </Grid>
                </Grid>
            </Box>

            <PortfoliosList/>

        </Box>
    );
}
export default PortfoliosInfo;
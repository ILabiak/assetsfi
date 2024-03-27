import React, { useState, useEffect, use } from 'react';
import styles from './binancedata.module.css';
import { Button, Typography, Box, Grid, Tabs, Tab } from '@mui/material';
import AddBinanceKeys from '@/components/AddBinanceKeys/AddBinanceKeys'
import BinanceAssetsInfo from '@/components/BinanceAssetsInfo/BinanceAssetsInfo'
import { useRouter } from 'next/navigation'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';



function BinanceData() {
    const [binanceData, setBinanceData] = useState()

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/server/binance/userdata`);
            if (response.status === 200) {
                const data = await response.json();
                setBinanceData(data)
                console.log(data)
            } else {
                const data = await response.json();
                console.log('Some other error');
                console.log(data)
            }
        } catch (error) {
            console.log('Error while getting portfolios data', error);
        }
    }

    const handleChange = () => {
        fetchData().catch(console.error)
    }

    useEffect(() => {
        // fetchData().catch(console.error)
    }, []);

    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' }, // sidebar width
            minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
            mt: { xs: '0px', md: '100px' } // header hight
        }}>

            {
                binanceData ? (
                    binanceData.totalValue ? (
                        <BinanceAssetsInfo assetsInfo={binanceData} handleChange={handleChange} />
                    ) : (
                        <AddBinanceKeys handleChange={handleChange} />
                    )

                )
                    : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
                            <CircularProgress size={70} sx={{
                                color: '#0228EE',
                            }} />
                        </Box>
                    )
            }
        </Box >
    );
}
export default BinanceData;
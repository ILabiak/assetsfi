import React, { useState, useEffect } from 'react';
import styles from './binancedata.module.css';
import { Box, Snackbar, Alert } from '@mui/material';
import AddBinanceKeys from '@/components/Binance/AddBinanceKeys/AddBinanceKeys'
import BinanceAssetsInfo from '@/components/Binance/BinanceAssetsInfo/BinanceAssetsInfo'
import CircularProgress from '@mui/material/CircularProgress';
import SnackbarContext from './SnackbarsContext';


function BinanceData() {
    const [binanceData, setBinanceData] = useState()
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };


    const fetchData = async () => {
        try {
            const response = await fetch(`/api/server/binance/userdata`);
            if (response.status === 200) {
                const data = await response.json();
                setBinanceData(data)
                console.log(data)
            } else {
                setBinanceData({})
                // const data = await response.json();
                // console.log('Some other error');
                // console.log(data)
            }
        } catch (error) {
            console.log('Error while getting portfolios data', error);
            
        }
    }

    const handleChange = () => {
        fetchData().catch(console.error)
    }

    useEffect(() => {
        fetchData().catch(console.error)
    }, []);

    return (
        <SnackbarContext.Provider value={{
            setErrorText,
            setErrorOpen,
            setSuccessOpen,
            setSuccessText
        }}>
            <Box component='main' className={styles.main} sx={{
                width: { xs: '100%', md: `calc(100% - 260px)` },
                ml: { xs: '0', md: '260px' }, // sidebar width
                minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
                mt: { xs: '100px', md: '100px' } // header hight
            }}>
                {
                    binanceData ? (
                        binanceData?.totalValue > -1 ? (
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
                <Snackbar open={errorOpen}
                    autoHideDuration={2000}
                    onClose={handleErrorClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        onClose={handleErrorClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Error: {errorText}
                    </Alert>
                </Snackbar>
                <Snackbar open={successOpen}
                    autoHideDuration={2000}
                    onClose={handleSuccessClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        onClose={handleSuccessClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {successText}
                    </Alert>
                </Snackbar>
            </Box >
        </SnackbarContext.Provider>
    );
}
export default BinanceData;
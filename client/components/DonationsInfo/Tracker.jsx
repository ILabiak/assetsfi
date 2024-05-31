import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddTrackingButton from './AddTrackingButton';
import AddressInfo from './AddressInfo'
import Masonry from '@mui/lab/Masonry';


function Tracker({ currencies }) {
    const [trackingData, setTrackingData] = useState()
    const [networks, setNetworks] = useState()
    const [successOpen, setSuccessOpen] = useState(false);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));


    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value)
        setSuccessOpen(true)
    }

    const fetchTrackingAddresses = async () => {
        try {
            const response = await fetch('/api/server/tracking/list');
            if (response.status === 200) {
                const data = await response.json();
                setTrackingData(data)
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting currencies data', error);
        }
    }


    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const response = await fetch('/api/server/networks');
                if (response.status === 200) {
                    const data = await response.json();
                    setNetworks(data)
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting currencies data', error);
            }
        }

        fetchNetworks().catch(console.error)
        fetchTrackingAddresses().catch(console.error)

    }, []);

    const handleTrackingsChange = () => {
        setTrackingData();
        fetchTrackingAddresses().catch(console.error)
    }

    return (
        <Box className={styles.trackerContainer} sx={{
            marginLeft: {xs: '15px', md: '30px'},
            marginRight: {xs: '15px', md: '30px'},
        }}>
            <Box className={styles.titleContainer}>
                <Box className={styles.totalBinanceTitleValueInfo}>
                    <Typography sx={{
                        fontFamily: 'DM Sans',
                        fontSize: '24px',
                        color: '#AEAEAE',
                        textDecoration: 'none',
                    }}>{'Tracking Addresses Overview'}</Typography>
                </Box>
                <AddTrackingButton
                    handleTrackingsChange={handleTrackingsChange}
                    networks={networks}
                    currencies={currencies}
                />
            </Box>
            {trackingData && networks && currencies ? (
                <>
                    {
                        trackingData?.addresses ? (
                            <Box sx={{ marginRight: -4 }}>
                                <Masonry columns={isXs ? 1 : 2} spacing={4} >
                                    {trackingData?.addresses.map((el, index) => (
                                        <AddressInfo
                                            key={`addressinfo-${index}`}
                                            addressData={el}
                                            copyData={copyToClipboard}
                                            metadata={trackingData?.metadata}
                                            handleTrackingsChange={handleTrackingsChange}
                                            networks={networks}
                                            currencies={currencies}
                                        />
                                    ))}
                                </Masonry>
                            </Box>
                        ) : (
                            <Box className={styles.noDataContainer}>
                                <Box className={styles.noDataItems}>
                                    <Typography
                                        className={styles.titleText}
                                        sx={{
                                            fontFamily: 'DM Sans',
                                            fontSize: { xs: '20px', md: '30px' },
                                        }}>
                                        You aren't tracking any donation addresses
                                    </Typography>
                                    <Box sx={{
                                        display: 'inline',
                                        width: '100%',
                                        maxWidth: '300px',
                                        height: '50px'
                                    }}>
                                        <AddTrackingButton
                                            handleTrackingsChange={handleTrackingsChange}
                                            networks={networks}
                                            currencies={currencies}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        )
                    }
                </>
            ) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 200px)',
                    width: '100%'
                }}>
                    <CircularProgress size={70} sx={{
                        color: '#0228EE',
                    }} />
                </Box>
            )
            }

            <Snackbar open={successOpen}
                autoHideDuration={750}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Copied to clipboard.
                </Alert>
            </Snackbar>
        </Box >
    );
}
export default Tracker;
import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddTrackingButton from './AddTrackingButton';


function Tracker() {
    const [trackingData, setTrackingData] = useState({})
    const [networks, setNetworks] = useState([{"id":"1","name":"Ethereum","code":"ethereum","createdAt":"2024-04-10T09:05:50.308Z","updatedAt":"2024-04-10T09:05:50.308Z"},{"id":"2","name":"Bitcoin","code":"bitcoin","createdAt":"2024-04-10T09:06:03.953Z","updatedAt":"2024-04-10T09:06:03.953Z"},{"id":"3","name":"Tron","code":"tron","createdAt":"2024-04-10T09:06:41.728Z","updatedAt":"2024-04-10T09:06:41.728Z"},{"id":"4","name":"Solana","code":"solana","createdAt":"2024-04-10T09:06:54.662Z","updatedAt":"2024-04-10T09:06:54.662Z"}])
    const [currencies, setCurrencies] = useState([{ "id": 1, "name": "USD", "code": "usd", "symbol": "$", "createdAt": "2024-03-10T18:21:45.952Z", "updatedAt": "2024-03-10T18:21:45.952Z" }, { "id": 2, "name": "EUR", "code": "eur", "symbol": "€", "createdAt": "2024-03-10T18:21:45.952Z", "updatedAt": "2024-03-10T18:21:45.952Z" }, { "id": 3, "name": "UAH", "code": "uah", "symbol": "₴", "createdAt": "2024-03-10T18:21:45.952Z", "updatedAt": "2024-03-10T18:21:45.952Z" }]);
    const [successOpen, setSuccessOpen] = useState(false);


    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };



    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('/api/server/');
                if (response.status === 200) {
                    const data = await response.json();
                    setCurrencies(data)
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting currencies data', error);
            }
        }

        // fetchData().catch(console.error)

    }, []);

    const handleTrackingsChange = () => {
        setMyDonationsData();
        fetchData().catch(console.error)
    }

    return (
        <Box className={styles.trackerContainer}>
            {trackingData ? (
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
            )}
        </Box>
    );
}
export default Tracker;
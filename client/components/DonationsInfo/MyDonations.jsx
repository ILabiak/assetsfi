import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DonationsTable from './DonationsTable';
import DonationStats from './DonationStats';


function MyDonations() {
    const [myDonationsData, setMyDonationsData] = useState()
    const [foundations, setFoundations] = useState()
    const [currencies, setCurrencies] = useState();
    const [successOpen, setSuccessOpen] = useState(false);


    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/server/donations`);
            if (response.status === 200) {
                const data = await response.json();
                setMyDonationsData(data)
            } else if (response.status === 401) {
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting donations data', error);
        }
    }


    useEffect(() => {

        const fetchCurrencies = async () => {
            try {
                const response = await fetch('/api/server/currencies');
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

        const fetchFoundations = async () => {
            try {
                const response = await fetch(`/api/server/foundationslist`);
                if (response.status === 200) {
                    const data = await response.json();
                    data.unshift({ "id": null, "name": "Other", "logoUrl": "https://svgshare.com/i/14xY.svg" })
                    setFoundations(data)
                } else if (response.status === 401) {
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting foundations data', error);
            }
        }

        fetchData().catch(console.error)
        fetchCurrencies().catch(console.error)
        fetchFoundations().catch(console.error)
    }, []);

    const handleDonationsChange = () => {
        setMyDonationsData();
        fetchData().catch(console.error)
    }

    return (
        <Box className={styles.myDonationsContainer}>
            {myDonationsData ? (
                <Box className={styles.myDonationsData} >
                    <DonationStats handleDonationsChange={handleDonationsChange}
                        donations={myDonationsData}
                        foundations={foundations}
                        currencies={currencies}
                    />
                    <DonationsTable
                        donations={myDonationsData.donations}
                        handleDonationsChange={handleDonationsChange}
                        foundations={foundations}
                        currencies={currencies}
                    />
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
export default MyDonations;
import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DonationsTable from './DonationsTable';
import DonationStats from './DonationStats';


function MyDonations() {
    const [myDonationsData, setMyDonationsData] = useState()
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
        fetchData().catch(console.error)
    }, []);

    const handleDonationsChange = () => {
        setMyDonationsData();
        fetchData().catch(console.error)
    }

    return (
        <Box className={styles.myDonationsContainer}>
            {myDonationsData ? (
                <Box className={styles.myDonationsData} >
                    <DonationStats handleDonationsChange={handleDonationsChange} />
                    <DonationsTable
                        donations={myDonationsData.donations}
                        handleDonationsChange={handleDonationsChange}
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
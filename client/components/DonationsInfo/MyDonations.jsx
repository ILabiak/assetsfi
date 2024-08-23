import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DonationsTable from './DonationsTable';
import DonationStats from './DonationStats';
import AddDonationButton from './AddDonationButton';

function MyDonations({ currencies }) {
    const [myDonationsData, setMyDonationsData] = useState()
    const [foundations, setFoundations] = useState()

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/server/donations`);
            if (response.status === 200) {
                const data = await response.json();
                setMyDonationsData(data)
            } else if (response.status === 400) {
                setMyDonationsData({donations: []})
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting donations data', error);
        }
    }

    useEffect(() => {
        const fetchFoundations = async () => {
            try {
                const response = await fetch(`/api/server/donations/foundations`);
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
        fetchFoundations().catch(console.error)
    }, []);

    const handleDonationsChange = () => {
        setMyDonationsData();
        fetchData().catch(console.error)
    }

    return (
        <Box className={styles.myDonationsContainer} sx={{
            margin: { xs: '0 15px 30px' , md: '0 30px 30px'}
        }}>
            {myDonationsData ? (
                <>
                    {
                        myDonationsData.donations.length > 0 ? (
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
                            <Box className={styles.noDonationsContainer}>
                                <Typography sx={{
                                    textAlign: 'center',
                                    fontFamily: 'DM Sans',
                                    fontSize: { xs: '24px', md: '40px' },
                                    color: '#AEAEAE',
                                    padding: '10px'
                                }}>
                                    You currently don't have any donations
                                </Typography>
                                <AddDonationButton
                                    handleDonationsChange={handleDonationsChange}
                                    foundations={foundations}
                                    currencies={currencies}
                                />
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
            )}
        </Box>
    );
}
export default MyDonations;
import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import Foundations from './Foundations';
import MyDonations from './MyDonations';
import Tracker from './Tracker';
import { Button, Typography, Box, Grid, Tabs, Tab } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function Donations() {
    const [tabValue, setTabValue] = useState(0)
    const [currencies, setCurrencies] = useState();

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
        fetchCurrencies().catch(console.error)
    }, []);


    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' }, // sidebar width
            minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
            mt: { xs: '0px', md: '100px' } // header hight
        }}>
            <Box>
                <Box className={styles.tabsContainer}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        aria-label="full width tabs example"
                        sx={{
                            color: 'white',
                            '& button': {
                                // backgroundColor: 'blue',
                                minHeight: '35px',
                                border: '1px solid',
                                marginRight: '20px',
                                borderRadius: '20px',
                                padding: '0px 10px',
                                '&.Mui-selected': {
                                    border: '2px solid #0228EE',
                                },
                            }
                        }}
                        TabIndicatorProps={{
                            sx: {
                                backgroundColor: "#0228EE"
                            }

                        }}
                    >
                        <Tab label="My donations" tabIndex={0} />
                        <Tab label="Foundations" tabIndex={1} />
                        <Tab label="Donations Tracker" tabIndex={2} />
                    </Tabs>
                </Box>

                <Box className={styles.tabContainer} sx={{
                    color: 'white',
                    display: tabValue == 0 ? 'inline' : 'none'
                }}>
                    <MyDonations currencies={currencies} />
                </Box>

                <Box className={styles.tabContainer} sx={{
                    color: 'white',
                    display: tabValue == 1 ? 'inline' : 'none'
                }}>
                    <Foundations />
                </Box>

                <Box className={styles.tabContainer} sx={{
                    color: 'white',
                    display: tabValue == 2 ? 'inline' : 'none'
                }}>
                    <Tracker currencies={currencies} />
                </Box>

            </Box>

        </Box >
    );
}
export default Donations;
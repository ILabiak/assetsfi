import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import Foundations from './Foundations';
import { Button, Typography, Box, Grid, Tabs, Tab } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function Donations({ uuid }) {
    const [tabValue, setTabValue] = useState(0)
    const [portfloioData, setPortfolioData] = useState()
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };


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
                        // variant="fullWidth"
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
                                    // borderBottom: '2px solid '
                                },
                            }
                        }}
                        TabIndicatorProps={{
                            sx: {
                                backgroundColor: "#0228EE"
                            }

                        }}
                    >
                        <Tab label="Foundations" tabIndex={0} />
                        <Tab label="My donations" tabIndex={1} />
                    </Tabs>
                </Box>

                <Box className={styles.tabContainer} sx={{
                    color: 'white',
                    display: tabValue == 0 ? 'inline' : 'none'
                }}>
                    <Foundations />
                </Box>

                <Box className={styles.tabContainer} sx={{
                    color: 'white',
                    display: tabValue == 1 ? 'inline' : 'none'
                }}>
                    <Box>321</Box>
                </Box>

            </Box>

        </Box >
    );
}
export default Donations;
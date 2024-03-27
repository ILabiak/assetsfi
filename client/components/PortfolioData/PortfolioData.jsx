import React, { useState, useEffect, use } from 'react';
import styles from './portfoliodata.module.css';
import TotalPortfoliosInfo from '@/components/TotalPortfolioInfo/TotalPortfoliosInfo';
import CreateTransactionButton from '@/components/CreateTransactionButton/CreateTransactionButton'
import CoinsStatsTable from '@/components/CoinsStatsTable/CoinsStatsTable';
import TransactionsTable from '@/components/TransactionsTable/TransactionsTable';
import PortfolioTransactionHead from '@/components/PortfolioTransactionHead/PortfolioTransactionHead'
import { Button, Typography, Box, Grid, Tabs, Tab } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function PortfolioData({ uuid }) {
    const [tabValue, setTabValue] = useState(0)
    const [portfloioData, setPortfolioData] = useState()
    const [valuesHidden, setValuesHidden] = useState(false)

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };


    const fetchData = async () => {
        try {
            const response = await fetch(`/api/server/portfolio/${uuid}`);
            if (response.status === 200) {
                const data = await response.json();
                setPortfolioData(data)
            } else if (response.status === 401) {
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting portfolios data', error);
        }
    }

    const handleTransactionsChange = () => {
        setPortfolioData()
        fetchData().catch(console.error)
    }

    useEffect(() => {
        fetchData().catch(console.error)
    }, []);

    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' }, // sidebar width
            minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
            mt: { xs: '0px', md: '100px' } // header hight
        }}>

            {
                portfloioData ? (
                    portfloioData?.title ? (
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
                                    <Tab label="Assets" tabIndex={0} />
                                    <Tab label="Transactions" tabIndex={1} />
                                </Tabs>
                            </Box>

                            <Box className={styles.assetsContainer} sx={{
                                color: 'white',
                                display: tabValue == 0 ? 'inline' : 'none'
                            }}>
                                <TotalPortfoliosInfo
                                    totalData={portfloioData}
                                    handlePortfolioChange={handleTransactionsChange}
                                    singlePortfolio={true}
                                    valuesHidden={valuesHidden}
                                    setValuesHidden={setValuesHidden}
                                />
                                <CoinsStatsTable portfolio={portfloioData} valuesHidden={valuesHidden} />
                            </Box>

                            <Box className={styles.transactionsContainer} sx={{
                                color: 'white',
                                display: tabValue == 1 ? 'inline' : 'none'
                            }}>
                                <PortfolioTransactionHead
                                    currency={portfloioData['Currency']}
                                    portfolio={portfloioData}
                                    handleTransactionsChange={handleTransactionsChange}
                                    valuesHidden={valuesHidden}
                                    setValuesHidden={setValuesHidden}
                                />

                                <TransactionsTable
                                    transactions={portfloioData['Transactions']}
                                    currency={portfloioData['Currency']}
                                    handleTransactionsChange={handleTransactionsChange}
                                    valuesHidden={valuesHidden}
                                />
                            </Box>

                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'black',
                                borderRadius: '10px',
                                width: '95%',
                                height: '200px',
                                // marginTop: '20px'
                            }}>
                                <Typography sx={{
                                    textAlign: 'center',
                                    fontFamily: 'DM Sans',
                                    fontSize: { xs: '24px', md: '40px' },
                                    color: '#AEAEAE',
                                    padding: '10px'
                                }}>
                                    Not available
                                </Typography>
                            </Box>

                        </Box>
                    )
                ) : (
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
export default PortfolioData;
import React, { useState, useEffect } from 'react';
import styles from './portfoliosinfo.module.css';
import TotalPortfoliosInfo from '@/components/TotalPortfolioInfo/TotalPortfoliosInfo';
import CreatePortfolioButton from '@/components/CreatePortfolioButton/CreatePortfolioButton';
import PortfoliosList from './PortfoliosList';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function PortfoliosInfo() {
    const [portfloiosData, setPortfoliosData] = useState()
    const [totalData, setTotalData] = useState()
    const [valuesHidden, setValuesHidden] = useState(false)

    const fetchData = async () => {
        try {
            const response = await fetch('/api/server/portfoliosdata');
            if (response.status === 200) {
                const data = await response.json();
                setPortfoliosData(data.portfolios)
                setTotalData(data.totalData)
            } else if (response.status === 401) {
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting portfolios data', error);
        }
    }

    const handlePortfoliosChange = () => {
        setPortfoliosData()
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
            mt: { xs: '100px', md: '100px' } // header hight
        }}>

            {
                portfloiosData ? (
                    portfloiosData.length > 0 ? (
                        <Box>
                            <TotalPortfoliosInfo
                                totalData={totalData}
                                handlePortfolioChange={handlePortfoliosChange}
                                singlePortfolio={false}
                                valuesHidden={valuesHidden}
                                setValuesHidden={setValuesHidden}
                            />
                            <PortfoliosList
                                portfoliosData={portfloiosData}
                                handlePortfoliosChange={handlePortfoliosChange}
                                valuesHidden={valuesHidden}
                            />
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
                            }}>
                                <Typography sx={{
                                    textAlign: 'center',
                                    fontFamily: 'DM Sans',
                                    fontSize: { xs: '24px', md: '40px' },
                                    color: '#AEAEAE',
                                    padding: '10px'
                                }}>
                                    You don't have any portfolios yet
                                </Typography>
                                <CreatePortfolioButton isLarge={true} handlePortfoliosChange={handlePortfoliosChange} />
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
        </Box>
    );
}
export default PortfoliosInfo;
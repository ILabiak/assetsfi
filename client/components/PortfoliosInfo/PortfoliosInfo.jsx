import React, { useState, useEffect, use } from 'react';
import styles from './portfoliosinfo.module.css';
import MiniStats from './MiniStats';
import TotalPortfoliosInfo from './TotalPortfoliosInfo';
import CreatePortfolioButton from '@/components/CreatePortfolioButton/CreatePortfolioButton';
import PortfoliosList from './PortfoliosList';
import { Button, Typography, Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';


function PortfoliosInfo({ user, error, isLoading }) {
    const [portfloiosData, setPortfoliosData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('/api/server/portfoliosdata');
                const response = await fetch('/api/');
                if (response.status === 200) {
                    const data = await response.json();
                    setPortfoliosData(data)
                } else if (response.status === 401) {
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting portfolios data', error);
            }
        }
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
                portfloiosData ? (
                    portfloiosData.length > 0 ? (
                        <Box>
                            <TotalPortfoliosInfo value={'13 324,32 $'} percentage={'12,35 %'} />

                            <Box className={styles.totalPotrfolioStats}>
                                <Grid container columnSpacing={4} spacing={1}>
                                    <Grid item xs={12} md={4}>
                                        <MiniStats title={'Daily Gain'} percentage={'2.28%'} value={'332,75 $'} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MiniStats title={'Total Gain'} percentage={'-68.5%'} value={'12 632,21 $'} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MiniStats title={'Total Invested'} percentage={''} value={'23 451,15 $'} />
                                    </Grid>
                                </Grid>
                            </Box>

                            <PortfoliosList portfoliosData={portfloiosData} />
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
                                    fontSize: {xs: '24px', md: '40px'},
                                    color: '#AEAEAE',
                                    padding: '10px'
                                }}>
                                    You don't have any portfolios yet
                                </Typography>
                                <CreatePortfolioButton isLarge={true}/>
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

            {/* {
                portfloiosData ? (
                    
                ) : (
                    
                )
            } */}



        </Box>
    );
}
export default PortfoliosInfo;
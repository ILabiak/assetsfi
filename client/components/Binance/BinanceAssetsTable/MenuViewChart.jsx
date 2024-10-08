import React, { useState, useRef, useEffect } from 'react';
import styles from './binanceassetstable.module.css';
import { Typography, Box, Backdrop, MenuItem } from '@mui/material';
import Image from 'next/image'
import { ChartComponent } from './Chart';
import TradingTools from './TradingTools';
import OrdersTable from './OrdersTable';
import CloseIcon from '@mui/icons-material/Close';

function MenuViewChart({ asset, handleChange }) {
    const [orders, setOrders] = useState()
    const socketRef = useRef(null);
    const [backdropOpen, setBackdropOpen] = useState(false)
    const chartRef = useRef(null);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/server/binance/userorders/${asset.pair}`);
            if (response.status === 200) {
                const data = await response.json();
                setOrders(data)
            } else {
                // const data = await response.json();
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting portfolios data', error);
        }
    }

    useEffect(() => {
        if (!backdropOpen) {
            if (socketRef.current && socketRef.current.socket) {
                socketRef.current.socket.close()
            }
        }
    }, [backdropOpen]);

    const handleOrdersChanged = () => {
        fetchOrders().catch(console.error)
    }

    useEffect(() => {
        fetchOrders().catch(console.error)
    }, []);

    const handleOpen = () => {
        setBackdropOpen(true);
    };

    return (
        <React.Fragment>
            <MenuItem
                onClick={handleOpen}
                key={'openChart'} >
                Open chart
            </MenuItem>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)'
                }}
                open={backdropOpen}
            >
                <Box className={styles.assetChartContainer} ref={chartRef} sx={{
                    width: {xs: '95%', md: '80%'}
                }}>
                    <Box className={styles.assetTitle}>
                        <Box className={styles.assetInfo}>
                            <Image alt='assetImg' width={50} height={50} src={asset?.logo} />
                            <Typography sx={{
                                fontWeight: 600,
                                ml: '10px',

                            }}>
                                {asset.pair}
                            </Typography>
                        </Box>

                        <Box className={styles.iconWrap}>
                            <Box
                                onClick={() => { setBackdropOpen(false) }}
                                className={styles.closeBackdropIcon}
                            >
                                <CloseIcon />
                            </Box>
                        </Box>
                    </Box>
                    <Box className={styles.chartInfo} sx={{
                        flexDirection: {xs: 'column', md: 'row'},
                        height: {xs: '80%', md: '55%'},
                                minHeight: {xs: '80%', md: '55%'},
                    }}>
                        <Box
                            className={styles.chart}
                            sx={{
                                minWidth: {xs: '100%', md: '70%'},
                                height: {xs: '50%', md: '100%'},
                                minHeight: {xs: '50%', md: '100%'},
                        }}
                        >
                            {backdropOpen &&
                                (
                                    <ChartComponent asset={asset} />
                                )
                            }
                        </Box>
                        <TradingTools
                            asset={asset}
                            handleOrdersChanged={handleOrdersChanged}
                            handleChange={handleChange}
                        />
                    </Box>

                    <Box className={styles.ordersContainer} sx={{
                                display: {xs: 'none', md: 'flex'}
                            }}>
                        <Box className={styles.ordersTitle}>
                            <Typography sx={{
                                fontWeight: 600,
                                color: '#9E9E9E',
                                ml: '10px',
                                mt: '5px'
                            }}>
                                Orders
                            </Typography>
                        </Box>
                        {orders && (
                            <Box className={styles.ordersTable} >
                                <OrdersTable orders={orders} handleOrdersChanged={handleOrdersChanged} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Backdrop>
        </React.Fragment>
    );
}
export default MenuViewChart;
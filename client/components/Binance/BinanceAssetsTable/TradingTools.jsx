import React, { useState, useEffect, useContext } from 'react';
import styles from './binanceassetstable.module.css';
import { Typography, Box } from '@mui/material';
import AmountField from '../../InputFields/AmountField';
import DisabledField from '../../InputFields/DisabledField';
import SnackbarContext from '../BinanceData/SnackbarsContext';
import CircularProgress from '@mui/material/CircularProgress';

function TradingTools({ asset, handleOrdersChanged, handleChange }) {
    const [tradingEnabled, setTradingEnabled] = useState()
    const [buyButtonActive, setBuyButtonActive] = useState(true)
    const [sellButtonActive, setSellButtonActive] = useState(false)
    const [isLimitOrder, setIsLimitOrder] = useState(true)
    const [isMarketOrder, setIsMarketOrder] = useState(false)
    const [limitPrice, setLimitPrice] = useState(asset.price)
    const [limitQuantity, setLimitQuantity] = useState('')
    const [marketQuantity, setMarketQuantity] = useState('')
    const [limitOrderValue, setLimitOrderValue] = useState('')
    const [createOrderButtonActive, setCreateOrderButtonActive] = useState(true)
    const {
        setErrorText,
        setErrorOpen,
        setSuccessOpen,
        setSuccessText
    } = useContext(SnackbarContext);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await fetch(`/api/server/binance/trading/permissions`);
                if (response.status === 200) {
                    setTradingEnabled(true)
                } else {
                    setTradingEnabled(false)
                }
            } catch (error) {
                console.log('Error while getting user permissions', error);
            }
        }
        fetchPermissions().catch(console.error)

    }, []);

    useEffect(() => {
        if (parseFloat(limitPrice) > 0 && parseFloat(limitQuantity)) {
            setLimitOrderValue(`${parseFloat(limitPrice) * parseFloat(limitQuantity)}`)
        } else {
            setLimitOrderValue('')
        }
    }, [limitPrice, limitQuantity]);

    const activateBuyButton = () => {
        setSellButtonActive(false)
        setBuyButtonActive(true)
    }

    const activateSellButton = () => {
        setBuyButtonActive(false)
        setSellButtonActive(true)

    }

    const setLimitOrder = () => {
        setIsMarketOrder(false)
        setIsLimitOrder(true)
    }

    const setMarketOrder = () => {
        setIsLimitOrder(false)
        setIsMarketOrder(true)
    }

    const createOrder = async () => {
        if (!createOrderButtonActive) return;
        setCreateOrderButtonActive(false)
        let orderObj = {}
        if (isLimitOrder) {
            orderObj = {
                symbol: asset.pair,
                quantity: limitQuantity,
                type: 'LIMIT',
                price: limitPrice,
                side: buyButtonActive && !sellButtonActive ? 'BUY' : 'SELL',
            }
        }
        if (isMarketOrder) {
            orderObj = {
                symbol: asset.pair,
                usdtQuantity: marketQuantity,
                type: 'MARKET',
                side: buyButtonActive && !sellButtonActive ? 'BUY' : 'SELL',
            }
        }
        const response = await fetch('/api/server/binance/order/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderObj),
            credentials: 'include'
        });
        if (response.status === 201) {
            let data = await response.json()
            setSuccessText(`Order ${data.orderId} successfully created`)
            setSuccessOpen(true)
            handleOrdersChanged();
            handleChange();
        } else {
            let data = await response.json()
            setErrorText(data.message)
            setErrorOpen(true)
            setCreateOrderButtonActive(true)
        }
        setCreateOrderButtonActive(true)
    }

    return (
        <>
            <Box className={styles.tradeContainer}>
                {
                    tradingEnabled != undefined ? (
                        <>
                            {
                                tradingEnabled ? (
                                    <Box className={styles.tradingTools} sx={{
                                        ml: {xs: '0px', md: '30px'},
                                        mt: {xs: '20px', md: '0px'}
                                    }}>
                                        <Box className={styles.tradeBuySellButtons}>
                                            <Box
                                                onClick={activateBuyButton}
                                                className={`${styles.buyButton} ${buyButtonActive ? '' : styles.disabled}`}
                                            >
                                                Buy
                                            </Box>
                                            <Box
                                                onClick={activateSellButton}
                                                className={`${styles.sellButton} ${sellButtonActive ? '' : styles.disabled}`}
                                            >
                                                Sell
                                            </Box>
                                        </Box>
                                        <Box className={styles.orderTypes}>
                                            <Typography
                                                onClick={setLimitOrder}
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    mr: '15px',
                                                    color: isLimitOrder ? '#F7A700' : '#9E9E9E'
                                                }}
                                            >
                                                Limit
                                            </Typography>
                                            <Typography
                                                onClick={setMarketOrder}
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    mr: '15px',
                                                    color: isMarketOrder ? '#F7A700' : '#9E9E9E'
                                                }}
                                            >
                                                Market
                                            </Typography>
                                        </Box>

                                        <Box className={styles.orderInputs}>
                                            {
                                                isLimitOrder && (
                                                    <>
                                                        <AmountField
                                                            amount={limitPrice}
                                                            setAmount={setLimitPrice}
                                                            title={'Order price (USDT)'}
                                                        />
                                                        <AmountField
                                                            amount={limitQuantity}
                                                            setAmount={setLimitQuantity}
                                                            title={`Quantity (${asset.asset})`}
                                                        />
                                                        <DisabledField title={'Order value (USDT)'} value={limitOrderValue} />
                                                    </>
                                                )
                                            }
                                            {
                                                isMarketOrder && (
                                                    <>
                                                        <AmountField
                                                            amount={marketQuantity}
                                                            setAmount={setMarketQuantity}
                                                            title={`Quantity (USDT)`}
                                                        />
                                                    </>
                                                )
                                            }
                                        </Box>

                                        <Box className={styles.submitOrderContainer}>
                                            <Box
                                                onClick={createOrder}
                                                className={`${buyButtonActive
                                                    ? `${styles.buyButton}`
                                                    : `${styles.sellButton}`} ${!createOrderButtonActive
                                                        ? `${styles.disabled}` : ''}`}
                                            >
                                                {buyButtonActive ? 'Buy' : 'Sell'} {`${asset.asset}`}
                                            </Box>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box className={styles.noPermissionContainer}>
                                        <Box className={styles.noPermissionInfo}>
                                            <Typography sx={{
                                                textAlign: 'center',
                                                fontSize: '20px',
                                                fontWeight: 600,
                                                color: '#9E9E9E',
                                                mt: '20px'
                                            }}>
                                                Your API key doesn't allow to trade
                                            </Typography>
                                            <Typography sx={{
                                                color: '#9E9E9E',
                                                mt: '20px',
                                                ml: '20px',
                                                mr: '20px',
                                                wordBreak: 'break-word'
                                            }}>
                                                You need to enable Spot & Margin Trading in your API Key settings <br />
                                                and add following IPs to "trusted IPs" list:<br /><br />
                                                3.75.158.163<br />3.125.183.140<br />35.157.117.28<br /><br />
                                                After that just reload the page.
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            }
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                            <CircularProgress size={40} sx={{
                                color: '#0228EE',
                            }} />
                        </Box>
                    )
                }
            </Box>
        </>
    );
}
export default TradingTools;
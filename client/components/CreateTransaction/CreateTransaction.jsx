import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import SearchField from '../InputFields/SearchField'
import QuantityField from '../InputFields/QuantityField'
import PriceField from '../InputFields/PriceField'
import FeesField from '../InputFields/FeesField'
import TotalPriceField from '../InputFields/TotalPriceField'
import NoteField from '../InputFields/NoteField'
import DateField from '../InputFields/DateField';
import styles from './createtransaction.module.css';
import { Typography, Box, Backdrop, TextField } from '@mui/material';

const filterData = (query, data) => {
    if (!query) {
        return;
    } else {
        const filtered = data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
        if (filtered.length > 0) {
            return filtered;
        }
    }
};

const numberRegex = /^[-+]?\d+(\.\d{0,5})?$/;

function CreateTransaction({ transactionCreateRef, handleClose, handleOpen, backdropOpen, setBackdropOpen, currency, portfolio, handleTransactionsChange }) {
    const [coins, setCoins] = useState()
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, coins);
    const [createButtonActive, setCreateButtonActive] = useState(false)
    const [name, setName] = useState("");
    const [currencyId, setCurrencyId] = useState(currency?.id);
    const [asset, setAsset] = useState();
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [currencyRate, setCurrencyRate] = useState(1)
    const [fees, setFees] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(dayjs(new Date()));

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch('/api/server/coins');
                if (response.status === 200) {
                    const data = await response.json();
                    setCoins(data)
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting coins data', error);
            }
        }

        const fetchCurrencyRate = async () => {
            try {
                const response = await fetch(`/api/server/currency/${currency?.code}`);
                if (response.status === 200) {
                    const data = await response.json();
                    if (data?.rate) {
                        setCurrencyRate(parseFloat(data.rate))
                    }
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting coins data', error);
            }
        }
        fetchCoins().catch(console.error)
        if (currency?.code !== 'usd') {
            fetchCurrencyRate().catch(console.error)
        }
    }, []);

    useEffect(() => {
        if (!backdropOpen) {
            setSearchQuery("")
            setAsset()
            setQuantity("")
            setPrice("")
            setFees("")
            setNote("")
            setDate(dayjs(new Date()))
        }
    }, [backdropOpen]);



    useEffect(() => {
        if (numberRegex.test(quantity) && numberRegex.test(price) && asset?.code) {
            setCreateButtonActive(true)
        }
        else {
            setCreateButtonActive(false)
        }
        // fetchCurrencies().catch(console.error)
    }, [quantity, price]);

    useEffect(() => {
        const fetchCoinPrice = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.code}&ids=${asset.code}`);
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data[0])
                    setPrice(data[0]?.current_price)
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting coins data', error);
            }
        }
        if (currency?.code && asset?.code) {
            fetchCoinPrice().catch(console.error)
        }
    }, [asset]);


    const handleTransactionCreate = async () => {
        if (!createButtonActive) return;
        setCreateButtonActive(false)
        let transactionObj = {
            portfolioId: portfolio.uuid,
            coinId: asset.id,
            date: dayjs(date).format(),
            amount: parseFloat(quantity),
            fees: parseFloat(fees),
            description: note,
            originCurrency: currency.name,
            costPerUnitInUsd: (parseFloat(price) / currencyRate),
            costPerUnitInCurrency: parseFloat(price),
        }
        // console.log(transactionObj)
        const response = await fetch('/api/server/transaction/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionObj),
            credentials: 'include'
        });
        if (response.status === 201) {
            setBackdropOpen(false)
            handleTransactionsChange();
        } else {
            console.log('Some other error');
            setCreateButtonActive(true)
        }
    }

    return (
        <Backdrop
            onClick={handleClose}

            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)'
            }}
            open={backdropOpen}
        >
            <Box className={styles.createPortfolioContainer} ref={transactionCreateRef}>
                <Typography
                    sx={{
                        fontFamily: 'DM Sans',
                        // fontStyle: 'bold',
                        fontSize: '30px',
                        fontWeight: '1000',
                        paddingLeft: '20px',
                        paddingBottom: '5px',
                        paddingTop: '5px',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                    }}>
                    Add transaction
                </Typography>
                <Box className={styles.inputsContainer}>
                    {asset ? (
                        <Box>
                            <TextField
                                required
                                disabled
                                id="outlined-required"
                                label="Asset"
                                value={asset.name}
                                fullWidth
                                sx={{
                                    marginBottom: '20px',
                                    '&:hover fieldset': {
                                        border: '1px solid',
                                        borderColor: 'white'
                                    },
                                    '& label.Mui-disabled': {
                                        color: '#AEAEAE',
                                    },
                                    input: {
                                        backgroundColor: '#313337',
                                        borderRadius: '5px',
                                        color: '#E8E9EB',
                                        fontSize: '16px',
                                    },
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#AEAEAE",
                                    }
                                }}
                            />
                            {
                                asset?.code && (
                                    <Box>
                                        <QuantityField quantity={quantity} setQuantity={setQuantity} />
                                        <PriceField price={price} setPrice={setPrice} currency={currency?.symbol} />
                                        <FeesField fees={fees} setFees={setFees} currency={currency?.symbol} />
                                        <TotalPriceField price={price} quantity={quantity} fees={fees} currency={currency?.symbol} />
                                        <NoteField note={note} setNote={setNote} />
                                        <DateField date={date} setDate={setDate} />
                                    </Box>
                                )
                            }

                        </Box>
                    ) : (
                        <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} dataFiltered={dataFiltered} setAsset={setAsset} />
                    )}


                </Box>
                <Box className={styles.buttonsContainer}>
                    <Box className={styles.cancelButton}
                        onClick={() => setBackdropOpen(false)}
                        sx={{
                            marginRight: '10px'
                        }}>
                        Cancel
                    </Box>
                    <Box
                        onClick={handleTransactionCreate}
                        className={`${styles.createPortfolioButton} ${!createButtonActive ? styles.disabled : ''}`}>
                        Create
                    </Box>

                </Box>
            </Box>
        </Backdrop>
    );
}
export default CreateTransaction;
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import SearchField from '../../InputFields/SearchField'
import QuantityField from '../../InputFields/QuantityField'
import PriceField from '../../InputFields/PriceField'
import FeesField from '../../InputFields/FeesField'
import TotalPriceField from '../../InputFields/TotalPriceField'
import NoteField from '../../InputFields/NoteField'
import DateField from '../../InputFields/DateField';
import styles from './edittransaction.module.css';
import { Typography, Box, Backdrop, TextField } from '@mui/material';


const numberRegex = /^[-+]?\d+(\.\d{0,5})?$/;

function EditTransaction({ transactionEditRef, handleClose, backdropOpen, setBackdropOpen, currency, transaction, handleTransactionsChange }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [editButtonActive, setEditButtonActive] = useState(false)
    const [name, setName] = useState("");
    const [currencyId, setCurrencyId] = useState(currency?.id);
    const [asset, setAsset] = useState(transaction['Coin']);
    const [quantity, setQuantity] = useState(transaction?.amount);
    const [price, setPrice] = useState(transaction?.costPerUnitInCurrency);
    const [currencyRate, setCurrencyRate] = useState(1)
    const [fees, setFees] = useState(transaction?.fees);
    const [note, setNote] = useState(transaction?.description || '');
    const [date, setDate] = useState(dayjs(transaction?.date));

    useEffect(() => {
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
        if (currency?.code !== 'usd') {
            fetchCurrencyRate().catch(console.error)
        }
    }, []);

    useEffect(() => {
        if (!backdropOpen) {
            setQuantity(transaction?.amount)
            setPrice(transaction?.costPerUnitInCurrency)
            setFees(transaction?.fees)
            setNote(transaction?.description)
            setDate(dayjs(transaction?.date))
        }

    }, [backdropOpen]);



    useEffect(() => {
        if (numberRegex.test(quantity) && numberRegex.test(price) && asset?.code) {
            setEditButtonActive(true)
        }
        else {
            setEditButtonActive(false)
        }
        // fetchCurrencies().catch(console.error)
    }, [quantity, price]);

    const handleTransactionEdit = async () => {
        if (!editButtonActive) return;
        setEditButtonActive(false)
        let transactionObj = {
            portfolioId: transaction?.portfolioId,
            id: transaction?.id,
        }
        if (dayjs(transaction?.date).format() != dayjs(date).format()) {
            transactionObj.date = dayjs(date).format();
        }
        if (parseFloat(quantity) != transaction?.amount) {
            transactionObj.amount = parseFloat(quantity);
        }
        if (parseFloat(fees) != transaction?.fees) {
            transactionObj.fees = parseFloat(fees);
        }
        if (note != transaction?.description) {
            transactionObj.description = note;
        }
        if (parseFloat(price) != transaction?.costPerUnitInCurrency) {
            transactionObj.costPerUnitInUsd = (parseFloat(price) / currencyRate);
            transactionObj.costPerUnitInCurrency = parseFloat(price);
        }
        // console.dir(transactionObj)
        // return;

        const response = await fetch('/api/server/transaction', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionObj),
            credentials: 'include'
        });
        if (response.status === 200) {
            let data = await response.json()
            setBackdropOpen(false)
            handleTransactionsChange();
        } else {
            console.log('Some other error');
            setEditButtonActive(true)
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
            <Box className={styles.createPortfolioContainer} ref={transactionEditRef} sx={{
                width: {xs: '90%', md:'30%'}
            }}>
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
                    Edit transaction
                </Typography>
                <Box className={styles.inputsContainer}>
                    {asset && (
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
                        onClick={handleTransactionEdit}
                        className={`${styles.createPortfolioButton} ${!editButtonActive ? styles.disabled : ''}`}>
                        Edit
                    </Box>

                </Box>
            </Box>
        </Backdrop>
    );
}
export default EditTransaction;
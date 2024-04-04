import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import SelectorField from '../InputFields/SelectorField'
import AmountField from '../InputFields/AmountField'
import NoteField from '../InputFields/NoteField'
import DateField from '../InputFields/DateField';
import styles from './editdonation.module.css';
import { Typography, Box, Backdrop, TextField } from '@mui/material';


const numberRegex = /^[-+]?\d+(\.\d{0,5})?$/;

function EditDonation({ donationEditRef, handleClose, backdropOpen, setBackdropOpen, donation, handleDonationsChange }) {
    const [editButtonActive, setEditButtonActive] = useState(false)
    const [foundations, setFoundations] = useState()
    const [foundation, setFoundation] = useState()
    const [currencies, setCurrencies] = useState();
    const [currency, setCurrency] = useState();
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(dayjs(new Date()));

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch('/api/server/currencies');
                if (response.status === 200) {
                    const data = await response.json();
                    setCurrencies(data)
                    let index = data.findIndex((el) => donation.currencyId == el.id)
                    setCurrency(data[index])
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting currencies data', error);
            }
        }

        const fetchFoundations = async () => {
            try {
                const response = await fetch(`/api/server/foundationslist`);
                if (response.status === 200) {
                    const data = await response.json();
                    data.unshift({ "id": null, "name": "Other", "logoUrl": "https://svgshare.com/i/14xY.svg" })
                    let index = data.findIndex((el) => donation.foundationId == el.id)
                    setFoundation(data[index])
                    setFoundations(data)

                } else if (response.status === 401) {
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting foundations data', error);
            }
        }
        fetchCurrencies().catch(console.error)
        fetchFoundations().catch(console.error)
    }, []);

    useEffect(() => {
        if (!backdropOpen) {
            setAmount(donation?.amount)
            setNote(donation?.description)
            setDate(dayjs(donation?.date))
            if (foundations) {
                let index = foundations.findIndex((el) => donation.foundationId == el.id)
                setFoundation(foundations[index])
            }
            if (currencies) {
                let index = currencies.findIndex((el) => donation.currencyId == el.id)
                setCurrency(currencies[index])
            }
        }

    }, [backdropOpen]);

    useEffect(() => {
        if (numberRegex.test(amount)) {
            setEditButtonActive(true)
        }
        else {
            setEditButtonActive(false)
        }
    }, [amount]);


    const handleDonationEdit = async () => {
        if (!editButtonActive) return;
        setEditButtonActive(false)
        let donationObj = {
            id: donation?.id,
        }
        if (foundation.id != donation.foundationId) {
            donationObj.foundationId = foundation.id;
        }
        if (parseFloat(amount) != donation?.amount) {
            donationObj.amount = parseFloat(amount);
        }
        if (dayjs(donation?.date).format() != dayjs(date).format()) {
            donationObj.date = dayjs(date).format();
        }
        if (note != donation?.description) {
            donationObj.description = note;
        }
        if (currency.id != donation.currencyId) {
            donationObj.currency = currency;
        }

        const response = await fetch('/api/server/donations/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationObj),
            credentials: 'include'
        });
        if (response.status === 200) {
            setBackdropOpen(false)
            handleDonationsChange();
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
            <Box className={styles.createPortfolioContainer} ref={donationEditRef}>
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
                    Edit donation
                </Typography>
                <Box className={styles.inputsContainer}>
                    {foundations && currencies && (
                        <Box>
                            <SelectorField selectorData={foundations}
                                currentValue={foundation}
                                setValue={setFoundation}
                                label={'Foundation'}
                                helperText={'Select foundation'}
                            />

                            <SelectorField selectorData={currencies}
                                currentValue={currency}
                                setValue={setCurrency}
                                label={'Currency'}
                                helperText={'Select currency'}
                            />

                            <AmountField amount={amount} setAmount={setAmount} currency={currency} />
                            <NoteField note={note} setNote={setNote} />
                            <DateField date={date} setDate={setDate} />
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
                        onClick={handleDonationEdit}
                        className={`${styles.createPortfolioButton} ${!editButtonActive ? styles.disabled : ''}`}>
                        Edit
                    </Box>

                </Box>
            </Box>
        </Backdrop>
    );
}
export default EditDonation;
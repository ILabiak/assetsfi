import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import SelectorField from '../InputFields/SelectorField'
import AmountField from '../InputFields/AmountField'
import NoteField from '../InputFields/NoteField'
import DateField from '../InputFields/DateField';
import styles from './donationsinfo.module.css';
import { Typography, Box, Backdrop, TextField } from '@mui/material';

const numberRegex = /^[-+]?\d+(\.\d{0,5})?$/;

function AddDonation({ donationCreateRef, handleClose, handleOpen, backdropOpen, setBackdropOpen, handleDonationsChange, foundations, currencies }) {
    const [foundation, setFoundation] = useState(foundations[0])
    const [createButtonActive, setCreateButtonActive] = useState(false)
    const [currency, setCurrency] = useState(currencies[0]);
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(dayjs(new Date()));

    useEffect(() => {
        if (!backdropOpen) {
            setAmount("")
            setNote("")
            setDate(dayjs(new Date()))
        }
    }, [backdropOpen]);


    useEffect(() => {
        if (numberRegex.test(amount)) {
            setCreateButtonActive(true)
        }
        else {
            setCreateButtonActive(false)
        }
    }, [amount]);



    const handleAddDonation = async () => {
        if (!createButtonActive) return;
        setCreateButtonActive(false)
        let donationObj = {
            foundationId: foundation.id,
            amount: parseFloat(amount),
            date: dayjs(date).format(),
            description: note,
            currency: currency
        }
        const response = await fetch('/api/server/donations/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationObj),
            credentials: 'include'
        });
        if (response.status === 201) {
            setBackdropOpen(false)
            handleDonationsChange();
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
            <Box className={styles.createDonationContainer} ref={donationCreateRef}>
                <Typography
                    sx={{
                        fontFamily: 'DM Sans',
                        fontSize: '30px',
                        fontWeight: '1000',
                        paddingLeft: '20px',
                        paddingBottom: '5px',
                        paddingTop: '5px',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                    }}>
                    Add donation
                </Typography>
                <Box className={styles.inputsContainer}>
                    <Box>
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
                        onClick={handleAddDonation}
                        className={`${styles.addDonationButton} ${!createButtonActive ? styles.disabled : ''}`}>
                        Create
                    </Box>

                </Box>
            </Box>
        </Backdrop>
    );
}
export default AddDonation;
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import SelectorField from '../InputFields/SelectorField'
import AmountField from '../InputFields/AmountField'
import TextDataField from '../InputFields/TextDataField'
import styles from './donationsinfo.module.css';
import { Typography, Box, Backdrop, Snackbar, Alert } from '@mui/material';

const numberRegex = /^[-+]?\d+(\.\d{0,5})?$/;

function AddTracking({ trackingCreateRef, handleClose, handleOpen, backdropOpen, setBackdropOpen, handleTrackingsChange, networks, currencies }) {
    const [createButtonActive, setCreateButtonActive] = useState(false)
    const [network, setNetwork] = useState(networks[0])
    const [currency, setCurrency] = useState(currencies[0]);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [errorText, setErrorText] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    useEffect(() => {
        if (!backdropOpen) {
            setAmount("")
            setAddress("")
            setName("")
        }
    }, [backdropOpen]);


    useEffect(() => {
        if (currency?.id && network?.id && address.length > 10) {
            setCreateButtonActive(true)
        }
        else {
            setCreateButtonActive(false)
        }
    }, [address]);

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const handleAddTracking = async () => {
        if (!createButtonActive) return;
        setCreateButtonActive(false)
        let trackingObj = {
            address: address,
            currencyId: currency.id,
            network: network,
            target: parseFloat(amount),
        }
        if(name.length > 0 && name.length < 50){
            trackingObj.name = name
        }
        const response = await fetch('/api/server/tracking/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackingObj),
            credentials: 'include'
        });
        if (response.status === 201) {
            setBackdropOpen(false)
            setSuccessOpen(true)
            // handleTrackingsChange();
        } else {
            let result = await response.json()
            setErrorText(result.message)
            setErrorOpen(true)
            // console.log('Some other error');
            setCreateButtonActive(true)
        }
    }

    return (
        <>
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
                <Box className={styles.createDonationContainer} ref={trackingCreateRef}>
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
                        Add wallet tracking
                    </Typography>
                    <Box className={styles.inputsContainer}>
                        <Box>
                            {networks && currencies && (
                                <Box>
                                    <SelectorField
                                        selectorData={networks}
                                        currentValue={network}
                                        setValue={setNetwork}
                                        label={'Network'}
                                        helperText={'Select cryptocurrency network'}
                                    />

                                    <SelectorField
                                        selectorData={currencies}
                                        currentValue={currency}
                                        setValue={setCurrency}
                                        label={'Currency'}
                                        helperText={'Select currency'}
                                    />

                                    <TextDataField
                                        text={name} setText={setName}
                                        title={'Name'} required={false}
                                    />
                                    {currency && (
                                        <AmountField
                                            amount={amount} setAmount={setAmount}
                                            currency={currency} title={'Fundraising target'}
                                        />
                                    )}


                                    <TextDataField
                                        text={address} setText={setAddress}
                                        title={'Wallet address'} required={true}
                                    />

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
                            onClick={handleAddTracking}
                            className={`${styles.addDonationButton} ${!createButtonActive ? styles.disabled : ''}`}>
                            Create
                        </Box>

                    </Box>
                </Box>
            </Backdrop>
            <Snackbar open={errorOpen}
                autoHideDuration={3000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleErrorClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Error: {errorText}
                </Alert>
            </Snackbar>
            <Snackbar open={successOpen}
                autoHideDuration={3000}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Address was successfully added
                </Alert>
            </Snackbar>
        </>
    );
}
export default AddTracking;
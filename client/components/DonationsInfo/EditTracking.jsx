import React, { useState, useEffect } from 'react';
import SelectorField from '../InputFields/SelectorField'
import AmountField from '../InputFields/AmountField'
import TextDataField from '../InputFields/TextDataField'
import styles from './donationsinfo.module.css';
import { Typography, Box, Backdrop, Snackbar, Alert } from '@mui/material';


function EditTracking({ trackingCreateRef, handleClose, handleOpen, backdropOpen, setBackdropOpen, handleTrackingsChange, networks, currencies, addressData }) {
    const [createButtonActive, setEditButtonActive] = useState(false)
    const [network, setNetwork] = useState(addressData['SupportedNetwork'])
    const [currency, setCurrency] = useState(addressData['Currency']);
    const [address, setAddress] = useState(addressData.address);
    const [name, setName] = useState(addressData?.name || "");
    const [amount, setAmount] = useState(addressData.targetAmount ? `${addressData.targetAmount}` : "");
    const [errorText, setErrorText] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    useEffect(() => {
        if (!backdropOpen) {
            setAmount(addressData.targetAmount ? `${addressData.targetAmount}` : "")
            setAddress(addressData.address)
            setName(addressData?.name || "")
            setCurrency(addressData['Currency'])
            setNetwork(addressData['SupportedNetwork'])
        }
    }, [backdropOpen]);


    useEffect(() => {
        if (currency?.id && network?.id && address.length > 10) {
            setEditButtonActive(true)
        }
        else {
            setEditButtonActive(false)
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

    const handleEditTracking = async () => {
        if (!createButtonActive) return;
        setEditButtonActive(false)
        let trackingObj = {
            id: addressData?.id
        }
        if (name != addressData.name && name.length < 50) {
            trackingObj.name = name
        }
        if (addressData.targetAmount != parseFloat(amount)) {
            trackingObj.target = parseFloat(amount)
        }
        if (addressData.address != address || addressData.networkId != network.id) {
            trackingObj.address = address
            trackingObj.network = network
        }
        if (addressData.currencyId != currency.id) {
            trackingObj.currency = currency
        }
        const response = await fetch('/api/server/tracking/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackingObj),
            credentials: 'include'
        });
        if (response.status === 200) {
            setBackdropOpen(false)
            setSuccessOpen(true)
            handleTrackingsChange();
            setEditButtonActive(true)
        } else {
            let result = await response.json()
            setErrorText(result.message)
            setErrorOpen(true)
            setEditButtonActive(true)
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
                <Box className={styles.createDonationContainer} ref={trackingCreateRef} sx={{
                    width: {xs: '90%', md: '30%'}
                }}>
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
                        Edit address tracking
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
                            onClick={handleEditTracking}
                            className={`${styles.addDonationButton} ${!createButtonActive ? styles.disabled : ''}`}>
                            Edit
                        </Box>

                    </Box>
                </Box>
            </Backdrop>
            <Snackbar open={errorOpen}
                autoHideDuration={1500}
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
                autoHideDuration={1500}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Address was successfully edited
                </Alert>
            </Snackbar>
        </>
    );
}
export default EditTracking;
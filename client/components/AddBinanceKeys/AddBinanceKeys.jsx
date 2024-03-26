import React, { useState, useEffect, use } from 'react';
import styles from './addbinancekeys.module.css';
import { Button, Typography, Box, TextField, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import NodeRSA from 'node-rsa';

const textFieldStyle = {
    marginBottom: '20px',
    '&:hover fieldset': {
        border: '1px solid',
        borderColor: 'white'
    },
    input: {
        backgroundColor: '#313337',
        borderRadius: '5px',
        color: '#E8E9EB',
        fontSize: '16px',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused:hover fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
    },

}



function AddBinanceKeys() {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [errorText, setErrorText] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);


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

    const handleApiKeyChange = (value) => {
        setApiKey(value)
    }

    const handleApiSecretChange = (value) => {
        setApiSecret(value)
    }

    const handleAddBinanceKeys = async () => {
        if (apiKey.length < 10) {
            setErrorText('Invalid Api Key data')
            setErrorOpen(true);
            return
        }
        if (apiSecret.length < 10) {
            setErrorText('Invalid Api Secret data')
            setErrorOpen(true);
            return
        }
        let publicKey = Buffer.from(process.env.NEXT_PUBLIC_RSA_KEY_PUBLIC, 'base64').toString('ascii')
        const key = new NodeRSA(publicKey, 'public')

        let encryptedApiKey = key.encrypt(apiKey, 'base64', 'utf-8');
        let encryptedApiSecret = key.encrypt(apiSecret, 'base64', 'utf-8');

        let reqBody = {
            apiKey: encryptedApiKey,
            apiSecret: encryptedApiSecret
        }

        const response = await fetch('/api/server/binance/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
            credentials: 'include'
        });
        if (response.status === 201) {
            setSuccessOpen(true)
            //handleUpdateBinanceInfo
        } else {
            let data = await response.json()
            setErrorText(data?.error)
            setErrorOpen(true)
        }

    }

    return (
        <Box className={styles.main}>
            <Box className={styles.addKeysContainer}>
                <Typography
                    className={styles.titleText}
                    sx={{
                        fontFamily: 'DM Sans',
                        fontSize: { xs: '20px', md: '30px' },
                    }}>
                    You haven't added your API keys yet
                </Typography>
                <Box className={styles.inputContainer}>
                    <Typography className={styles.textFieldTitle}>Api Key</Typography>
                    <TextField
                        required
                        id="outlined-required"
                        value={apiKey}
                        onChange={(e) => {
                            handleApiKeyChange(e.target.value);
                        }}
                        fullWidth
                        sx={textFieldStyle}
                    />

                    <Typography className={styles.textFieldTitle}>Api Secret</Typography>
                    <TextField
                        required
                        id="outlined-required"
                        value={apiSecret}
                        onChange={(e) => {
                            handleApiSecretChange(e.target.value);
                        }}
                        fullWidth
                        sx={textFieldStyle}
                    />
                    <Box className={styles.buttonContainer}>
                        <Box
                            onClick={handleAddBinanceKeys}
                            className={`${styles.addButton}`}>
                            Add keys
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Snackbar open={errorOpen}
                autoHideDuration={6000}
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
                autoHideDuration={6000}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Api keys were successfully added
                </Alert>
            </Snackbar>
        </Box>
    )
}
export default AddBinanceKeys;
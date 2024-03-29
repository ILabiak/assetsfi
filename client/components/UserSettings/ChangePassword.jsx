import React, { useState, useEffect, use } from 'react';
import styles from './usersettings.module.css';
import { Typography, Box, TextField, Snackbar, Alert, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NodeRSA from 'node-rsa';

const textFieldStyle = {
    backgroundColor: '#313337',
    borderRadius: '5px',
    mr: '40px',
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
    '& .MuiInputAdornment-root': {
        backgroundColor: '#313337',
        '&.Mui-focused': {
            backgroundColor: '#313337',
        },
    }

}

const validatePassword = (password) => {
    // Regex checks for each type
    const lowercaseCheck = /[a-z]/.test(password);
    const uppercaseCheck = /[A-Z]/.test(password);
    const digitCheck = /[0-9]/.test(password);
    const specialCharCheck = /[!@#$%^&*]/.test(password);

    // Count how many true results we get
    const trueCounts = [lowercaseCheck, uppercaseCheck, digitCheck, specialCharCheck].filter(Boolean).length;

    // Ensure at least 3 out of 4 character types are present along with the length check
    return (trueCounts >= 3 && password.length >= 8);

}

const nameRegex = /^[\p{L}\d\s\p{P}]{4,25}$/u;

function ChangePassword({ user, setUserData }) {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [changeButtonActive, setChangeButtonActive] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleOldPasswordChange = (value) => {
        setOldPassword(value)
        if (validatePassword(value) && validatePassword(newPassword)) {
            setChangeButtonActive(true)
        } else {
            setChangeButtonActive(false)
        }
    }

    const handleNewPasswordChange = (value) => {
        // console.log(validatePassword(value))
        if (validatePassword(value) && validatePassword(oldPassword)) {
            setChangeButtonActive(true)
        } else {
            setChangeButtonActive(false)
        }
        setNewPassword(value)
    }

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

    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);


    const handleChangePasswordClick = async () => {
        if (!changeButtonActive) {
            // console.log('button inactive')
            return;
        }
        let publicKey = Buffer.from(process.env.NEXT_PUBLIC_RSA_KEY_PUBLIC, 'base64').toString('ascii')
        const key = new NodeRSA(publicKey, 'public')

        let encryptedOldPassword = key.encrypt(oldPassword, 'base64', 'utf-8');
        let encryptedNewPassword = key.encrypt(newPassword, 'base64', 'utf-8');
        const changeData = {
            email: user?.email,
            oldPassword: encryptedOldPassword,
            newPassword: encryptedNewPassword
        }
        setChangeButtonActive(false)
        const response = await fetch('/api/server/user/changepassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changeData),
            credentials: 'include'
        });
        if (response.status === 200) {
            let data = await response.json()
            console.log(data)
            // setUserData(data)
            setSuccessOpen(true)
            setOldPassword('')
            setNewPassword('')
        } else {
            console.log('Some other error');
            let data = await response.json()
            console.log(data)
            setErrorText(data?.error)
            setErrorOpen(true)
            setChangeButtonActive(true)
        }
    }

    return (
        <Box>

            
            <Typography className={styles.textFieldTitle}>Old password</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <TextField
                    required
                    type={showOldPassword ? 'text' : 'password'}
                    id="outlined-oldpassword"
                    value={oldPassword}
                    onChange={(e) => {
                        handleOldPasswordChange(e.target.value);
                    }}
                    fullWidth
                    sx={{
                        ...textFieldStyle,
                        mr: '0'
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment
                                position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldPassword}
                                    // onMouseDown={handleMouseDownPassword}

                                    edge="end"
                                    sx={{
                                        color: 'white',
                                        // backgroundColor: '#313337'
                                    }}
                                >
                                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}

                />
            </Box>

            <Typography className={styles.textFieldTitle}>New password</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <TextField
                    required
                    type={showNewPassword ? 'text' : 'password'}
                    id="outlined-newpassword"
                    value={newPassword}
                    onChange={(e) => {
                        handleNewPasswordChange(e.target.value);
                    }}
                    fullWidth
                    sx={{
                        ...textFieldStyle,
                        mr: '0'
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment
                                position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    edge="end"
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}

                />
            </Box>

            <Box className={styles.buttonContainer}>
                <Box
                    onClick={handleChangePasswordClick}
                    className={`${styles.editButton} ${!changeButtonActive ? styles.disabled : ''}`}>
                    Change password
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
                    Password was successfully changed
                </Alert>
            </Snackbar>

        </Box >
    );
}
export default ChangePassword;
import React, { useState, useEffect, use } from 'react';
import styles from './usersettings.module.css';
import { Typography, Box, TextField, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

import EditIcon from '@mui/icons-material/Edit';

const textFieldStyle = {
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

}

const usernameRegex = /^[A-Za-z][A-Za-z0-9_.]{5,20}$/;

function EditUsername({ user, setUserData }) {
    const [username, setUsername] = useState(user?.nickname);
    const [editButtonActive, setEditButtonActive] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleUsernameChange = (value) => {
        setUsername(value)
        if (value != user?.nickname && usernameRegex.test(value)) {
            setEditButtonActive(true)
        } else {
            setEditButtonActive(false)
        }
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

    const handleEditClick = async () => {
        if (!editButtonActive) {
            // console.log('button inactive')
            return;
        }
        const updateData = {}
        if (username != user?.nickname && usernameRegex.test(username)) {
            updateData.nickname = username
        }
        setEditButtonActive(false)
        const response = await fetch('/api/server/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
            credentials: 'include'
        });
        if (response.status === 200) {
            let data = await response.json()
            setUserData(data)
            setSuccessOpen(true)
        } else {
            console.log('Some other error');
            let data = await response.json()
            setErrorText(data?.error)
            setErrorOpen(true)
            setEditButtonActive(true)
        }
    }

    return (
        <Box>


            <Typography className={styles.textFieldTitle}>Username</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <TextField
                    required
                    id="outlined-username-disabled"
                    value={username}
                    onChange={(e) => {
                        handleUsernameChange(e.target.value);
                    }}
                    fullWidth
                    sx={textFieldStyle}
                />
                <Box
                    onClick={handleEditClick}
                    className={`${styles.editButton} ${!editButtonActive ? styles.disabled : ''}`}>
                    <EditIcon fontSize='small' /> Edit
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
                    Profile was successfully edited
                </Alert>
            </Snackbar>

        </Box >
    );
}
export default EditUsername;
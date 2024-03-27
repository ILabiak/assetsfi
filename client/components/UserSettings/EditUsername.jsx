import React, { useState, useEffect, use } from 'react';
import styles from './usersettings.module.css';
import { Typography, Box, TextField, Backdrop } from '@mui/material';
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

function EditUsername({ user }) {
    const [username, setUsername] = useState(user?.nickname);
    const [editButtonActive, setEditButtonActive] = useState(false);

    const handleUsernameChange = (value) => {
        setUsername(value)
        if (value != user?.nickname && value.length > 5) {
            setEditButtonActive(true)
        } else {
            setEditButtonActive(false)
        }
    }

    const handleEditClick = () => {
        if (!editButtonActive) {
            console.log('button inactive')
            return;
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
                    id="outlined-disabled"
                    value={username}
                    onChange={(e) => {
                        handleUsernameChange(e.target.value);
                    }}
                    fullWidth
                    sx={textFieldStyle}
                />
                <Box className={`${styles.editButton} ${!editButtonActive ? styles.disabled : ''}`}>
                    <EditIcon fontSize='small' /> Edit
                </Box>
            </Box>

        </Box >
    );
}
export default EditUsername;
import React, { useState, useEffect } from 'react';
import styles from './createportfoliobutton.module.css';
import { Button, Typography, Box, Backdrop, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const currencies = [
    {
        value: 'USD',
        label: 'USD $',
    },
    {
        value: 'EUR',
        label: 'EUR €',
    },
    {
        value: 'UAH',
        label: 'UAH ₴',
    },
];

function CreatePortfolioButton({ isLarge }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [name, setName] = useState("");

    const handleClose = () => {
        // setBackdropOpen(false);
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    return (
        <React.Fragment>
            <Box sx={{
                padding: isLarge ? '10px 30px' : '5px',
                marginTop: isLarge ? '10px' : '0px',
            }} className={styles.createButton}>
                Create portfolio
            </Box>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)'
                }}
                open={backdropOpen}
                onClick={handleClose}
            >
                <Box className={styles.createPortfolioContainer}>
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
                        Create portfolio
                    </Typography>
                    <Box className={styles.inputsContainer}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            fullWidth
                            sx={{
                                marginBottom: '20px',
                                '&:hover fieldset': {
                                    border: '1px solid',
                                    borderColor: 'white'
                                },
                                '& label': {
                                    color: '#AEAEAE',
                                },
                                '& label.Mui-focused': {
                                    color: '#AEAEAE',
                                },
                                input: {
                                    backgroundColor: '#313337',
                                    borderRadius: '5px',
                                    color: '#E8E9EB'
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
                                }
                            }}
                        />
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Currency"
                            fullWidth
                            defaultValue="USD"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select portfolio currency"
                            sx={{
                                '&:hover fieldset': {
                                    border: '1px solid',
                                    borderColor: 'white'
                                },
                                '& label': {
                                    color: '#AEAEAE',
                                },
                                '& label.Mui-focused': {
                                    color: '#AEAEAE',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        color: 'white',
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '.MuiInputBase-input': { color: '#E8E9EB', backgroundColor: '#313337' },
                                '.MuiFormHelperText-root': {
                                    color: '#AEAEAE'
                                }
                            }}
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Box>
                    <Box className={styles.buttonsContainer}>
                        <Box className={styles.cancelButton} sx={{
                            marginRight: '10px'
                        }}>
                            Cancel
                        </Box>
                        <Box className={styles.createPortfolioButton}>
                            Create
                        </Box>

                    </Box>
                </Box>
            </Backdrop>
        </React.Fragment>
    );
}
export default CreatePortfolioButton;
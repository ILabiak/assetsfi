import React, { useState, useEffect, useRef } from 'react';
import styles from './createportfoliobutton.module.css';
import { Typography, Box, Backdrop, TextField } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

function CreatePortfolioButton({ isLarge, handlePortfoliosChange }) {
    const [currencies, setCurrencies] = useState();
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [createButtonActive, setCreateButtonActive] = useState(false)
    const [name, setName] = useState("");
    const [currencyId, setCurrencyId] = useState(1);
    const portfolioCreateRef = useRef(null);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch('/api/server/currencies');
                if (response.status === 200) {
                    const data = await response.json();
                    setCurrencies(data)
                } else {
                    console.log('Some other error');
                }
            } catch (error) {
                console.log('Error while getting portfolios data', error);
            }
        }
        fetchCurrencies().catch(console.error)
    }, []);

    const handleClose = (event) => {
        if (
            portfolioCreateRef.current &&
            !portfolioCreateRef.current.contains(event.target)
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    const handleNameChange = (value) => {
        setName(value)
        if (value.length > 0 && value.length < 50
            && value.match(/^[A-Za-z0-9\s\-_,\.;:()]+$/)) {
            setCreateButtonActive(true)
        } else {
            setCreateButtonActive(false)
        }
    }

    const handlePortfolioCreate = async () => {
        if (!createButtonActive) return;
        setCreateButtonActive(false)
        // console.log({ name, currencyId })
        const response = await fetch('/api/server/portfolio/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, currencyId }),
            credentials: 'include'
        });
        if (response.status === 201) {
            setBackdropOpen(false)
            handlePortfoliosChange();
        } else {
            console.log('Some other error');
            setCreateButtonActive(true)
        }
    }

    return (
        <React.Fragment>
            <Box
                onClick={handleOpen}
                sx={{
                    padding: isLarge ? '10px 30px' : '5px',
                    marginTop: isLarge ? '10px' : '0px',
                }} className={styles.createButton}>
                Create portfolio
            </Box>
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
                <Box className={styles.createPortfolioContainer} ref={portfolioCreateRef}>
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
                                handleNameChange(e.target.value);
                            }}
                            fullWidth
                            sx={inputStyles.nameInput}
                        />
                        {currencies && <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Currency"
                            value={currencyId}
                            onChange={(event) => {
                                setCurrencyId(parseInt(event.target.value));
                            }}
                            fullWidth
                            // defaultValue={currencies[0]?.id}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select portfolio currency"
                            sx={inputStyles.currencyInput}
                        >
                            {currencies.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        }
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
                            onClick={handlePortfolioCreate}
                            className={`${styles.createPortfolioButton} ${!createButtonActive ? styles.disabled : ''}`}>
                            Create
                        </Box>

                    </Box>
                </Box>
            </Backdrop>
        </React.Fragment>
    );
}
export default CreatePortfolioButton;
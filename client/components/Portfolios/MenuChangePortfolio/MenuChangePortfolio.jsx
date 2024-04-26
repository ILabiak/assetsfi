import React, { useState, useRef } from 'react';
import styles from './menuchangeportfolio.module.css';
import { Typography, Box, Backdrop, TextField, MenuItem } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

function MenuChangePortfolio({ portfolio, handlePortfoliosChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [changeButtonActive, setChangeButtonActive] = useState(true)
    const [name, setName] = useState(portfolio.title);
    const portfolioChangeRef = useRef(null);

    const handleClose = (event) => {
        if (
            portfolioChangeRef.current &&
            !portfolioChangeRef.current.contains(event.target)
        ) {
            setBackdropOpen(false);
            setName(portfolio.title)
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    const handleNameChange = (value) => {
        setName(value)
        if (value.length > 0 && value.length < 50
            && value.match(/^[A-Za-z0-9\s\-_,\.;:()]+$/)) {
            setChangeButtonActive(true)
        } else {
            setChangeButtonActive(false)
        }
    }

    const handlePortfolioDelete = async () => {
        setChangeButtonActive(false)
        const response = await fetch('/api/server/portfolio/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: portfolio?.uuid,
                name
            }),
            credentials: 'include'
        });
        if (response.status === 200) {
            setBackdropOpen(false)
            handlePortfoliosChange();
        } else {
            console.log('Some other error');
            setChangeButtonActive(true)
        }
    }


    return (
        <React.Fragment>
            <MenuItem
                onClick={handleOpen}
                key={'deletePortfolio'} >
                Rename portfolio
            </MenuItem>
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
                <Box className={styles.deletePortfolioContainer} ref={portfolioChangeRef}>

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
                        Change portfolio
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
                    </Box>

                    <Box className={styles.buttonsContainer}>
                        <Box className={styles.cancelButton}
                            onClick={() => {
                                setName(portfolio.title)
                                setBackdropOpen(false)
                            }}>
                            Cancel
                        </Box>
                        <Box
                            onClick={handlePortfolioDelete}
                            className={`${styles.changePortfolioButton} ${!changeButtonActive ? styles.disabled : ''}`}>
                            Change
                        </Box>
                    </Box>
                </Box>
            </Backdrop>
        </React.Fragment>
    );
}
export default MenuChangePortfolio;
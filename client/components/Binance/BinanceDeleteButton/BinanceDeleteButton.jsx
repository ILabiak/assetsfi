import React, { useState, useEffect, useRef } from 'react';
import styles from './binancedeletebutton.module.css';
import { Typography, Box, Grid, Backdrop } from '@mui/material';
import MiniStats from '@/components/MiniStats/MiniStats';
import DeleteIcon from '@mui/icons-material/Delete';

function BinanceDeleteButton({ handleBinanceChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [deleteButtonActive, setDeleteButtonActive] = useState(true)
    const binanceDeleteRef = useRef(null);

    const handleClose = (event) => {
        if (
            binanceDeleteRef.current &&
            !binanceDeleteRef.current.contains(event.target)
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    const handleDeleteKeys = async () => {
        setDeleteButtonActive(false)
        const response = await fetch('/api/server/binance', {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.status === 200) {
            setBackdropOpen(false)
            handleBinanceChange();
        } else {
            console.log('Some other error');
            setDeleteButtonActive(true)
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box className={styles.buttonContainer}>
                <Box 
                onClick={handleOpen}
                className={styles.deleteBinanceButton}>
                    Delete api keys
                </Box>
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
                <Box className={styles.deletePortfolioContainer} ref={binanceDeleteRef} sx={{
                    width: {xs: '90%', md: '25%'}
                }}>
                    <Box className={styles.warningContainer}>
                        <Box className={styles.warning}>
                            <Box className={styles.deleteIcon}>
                                <DeleteIcon />
                            </Box>

                            <Box className={styles.warningTextBox}>
                                <Typography
                                    sx={{
                                        fontFamily: 'DM Sans',
                                        fontSize: '20px',
                                        fontWeight: '1000',
                                    }}>
                                    Delete api keys
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'DM Sans',
                                        fontSize: '14px',
                                        fontWeight: '1000',
                                    }}>
                                    Do you want to delete your api keys?
                                </Typography>
                            </Box>

                        </Box>

                    </Box>

                    <Box className={styles.buttonsContainer}>
                        <Box className={styles.cancelButton}
                            onClick={() => setBackdropOpen(false)}>
                            Cancel
                        </Box>
                        <Box
                            onClick={handleDeleteKeys}
                            className={`${styles.deleteKeysButton} ${!deleteButtonActive ? styles.disabled : ''}`}>
                            Delete
                        </Box>
                    </Box>
                </Box>
            </Backdrop>

        </Box>

    );
}
export default BinanceDeleteButton;
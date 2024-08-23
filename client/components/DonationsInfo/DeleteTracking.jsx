import React, { useState, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Typography, Box, Backdrop, useMediaQuery, useTheme } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';


function truncateMiddle(str, startLength, endLength) {
    if (str.length <= startLength + endLength) {
        return str;
    }

    const start = str.substring(0, startLength);
    const end = str.substring(str.length - endLength);

    return `${start}...${end}`;
}

function DeleteTracking({ addressData, handleTrackingsChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [deleteButtonActive, setDeleteButtonActive] = useState(true)
    const trackingDeleteRef = useRef(null);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = (event) => {
        if (
            trackingDeleteRef.current &&
            !trackingDeleteRef.current.contains(event.target)
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    const handleTransactionDelete = async () => {
        setDeleteButtonActive(false)
        const response = await fetch(`/api/server/tracking/${addressData?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (response.status === 200) {
            setBackdropOpen(false)
            setDeleteButtonActive(true)
            handleTrackingsChange();
        } else {
            console.log('Some other error');
            setDeleteButtonActive(true)
        }
    }


    return (

        <React.Fragment>
            <Box
                onClick={handleOpen} className={styles.deleteIcon}
            >
                <DeleteForeverIcon />
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
                <Box className={styles.deletePortfolioContainer} ref={trackingDeleteRef} sx={{
                    width: { xs: '90%', md: '35%' },
                }}>
                    <Box className={styles.warningContainer}>
                        <Box className={styles.warning}>
                            <Box className={styles.deleteBackdropIcon}>
                                <DeleteIcon />
                            </Box>
                            <Box className={styles.warningTextBox}>
                                <Typography
                                    sx={{
                                        fontFamily: 'DM Sans',
                                        fontSize: '16px',
                                        fontWeight: '1000',
                                    }}>
                                    {`Delete ${isXs ? truncateMiddle(addressData.address, 8, 8) : addressData.address}`}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'DM Sans',
                                        fontSize: '14px',
                                        fontWeight: '1000',
                                    }}>
                                    Do you want to delete this tracking address?
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={styles.buttonsContainer}>
                        <Box className={styles.cancelBackdropButton}
                            onClick={() => setBackdropOpen(false)}>
                            Cancel
                        </Box>
                        <Box
                            onClick={handleTransactionDelete}
                            className={`${styles.deleteBackdropButton} ${!deleteButtonActive ? styles.disabled : ''}`}>
                            Delete
                        </Box>
                    </Box>
                </Box>
            </Backdrop>
        </React.Fragment>
    );
}
export default DeleteTracking;
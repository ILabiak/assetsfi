import React, { useState, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Typography, Box, Backdrop } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteTracking({ addressData, handleTrackingsChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [deleteButtonActive, setDeleteButtonActive] = useState(true)
    const trackingDeleteRef = useRef(null);

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
        const response = await fetch('/api/server/tracking/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: addressData?.id
            }),
            credentials: 'include'
        });
        if (response.status === 200) {
            setBackdropOpen(false)
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
                <Box className={styles.deletePortfolioContainer} ref={trackingDeleteRef}>
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
                                    {`Delete ${addressData.address}`}
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
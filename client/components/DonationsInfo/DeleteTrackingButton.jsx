import React, { useState, useEffect, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import AddTracking from './AddTracking';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function DeleteTrackingButton({ handleTrackingsChange, networks, currencies }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const trackingCreateRef = useRef(null);

    const handleClose = (event) => {
        if (
            (trackingCreateRef.current &&
                !trackingCreateRef.current.contains(event.target))
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    return (
        <React.Fragment>
            <Box
                onClick={handleOpen} className={styles.deleteIcon}
            >
                <DeleteForeverIcon/>
            </Box>
            {networks && currencies && (
                <Box></Box>
            )}
        </React.Fragment>
    );
}
export default DeleteTrackingButton;
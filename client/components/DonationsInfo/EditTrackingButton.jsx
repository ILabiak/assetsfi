import React, { useState, useEffect, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import AddTracking from './AddTracking';
import EditIcon from '@mui/icons-material/Edit';
import EditTracking from './EditTracking';


function EditTrackingButton({ handleTrackingsChange, networks, currencies, addressData }) {
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
                onClick={handleOpen} className={styles.editIcon}
            >
                <EditIcon></EditIcon>
            </Box>
            {networks && currencies && (
                <EditTracking
                trackingCreateRef={trackingCreateRef}
                handleOpen={handleOpen} handleClose={handleClose}
                backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen}
                handleTrackingsChange={handleTrackingsChange}
                networks={networks} currencies={currencies}
                addressData={addressData}
                />
            )}
        </React.Fragment>
    );
}
export default EditTrackingButton;
import React, { useState, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Box } from '@mui/material';
import AddTracking from './AddTracking';


function AddTrackingButton({ handleTrackingsChange, networks, currencies }) {
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
                onClick={handleOpen}
                sx={{
                    padding: '5px',
                    marginTop: '0px',
                }} className={styles.createButton}>
                Add tracking
            </Box>
            {networks && currencies && (
                <AddTracking
                    trackingCreateRef={trackingCreateRef}
                    handleOpen={handleOpen} handleClose={handleClose}
                    backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen}
                    handleTrackingsChange={handleTrackingsChange}
                    networks={networks} currencies={currencies}
                />
            )}
        </React.Fragment>
    );
}
export default AddTrackingButton;
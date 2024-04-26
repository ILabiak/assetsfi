import React, { useState, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Box } from '@mui/material';
import AddDonation from './AddDonation';


function AddDonationButton({ handleDonationsChange, foundations, currencies }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const donationCreateRef = useRef(null);

    const handleClose = (event) => {
        let parent = event?.target?.parentNode?.className.toString()
        if (parent && (parent.includes('Picker') ||
            parent.includes('MuiDay') ||
            parent.includes('MuiDate'))) {
            return;
        }
        if (
            (donationCreateRef.current &&
                !donationCreateRef.current.contains(event.target))
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
                Add donation
            </Box>
            {foundations && currencies && (
                <AddDonation
                    donationCreateRef={donationCreateRef}
                    handleOpen={handleOpen} handleClose={handleClose}
                    backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen}
                    handleDonationsChange={handleDonationsChange}
                    foundations={foundations}
                    currencies={currencies}
                />
            )}
        </React.Fragment>
    );
}
export default AddDonationButton;
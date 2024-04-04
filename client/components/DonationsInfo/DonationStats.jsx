import React, { useState, useEffect, use } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import AddDonationButton from './AddDonationButton';


function DonationStats({handleDonationsChange}) {
    return (
        <Box className={styles.statsContainer}>
            <Box>123</Box>
            <Box>
                <AddDonationButton handleDonationsChange={handleDonationsChange} />
            </Box>
        </Box>
    );
}
export default DonationStats;
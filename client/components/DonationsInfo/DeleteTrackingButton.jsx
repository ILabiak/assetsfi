import React, { useState, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function DeleteTrackingButton({ handleTrackingsChange, networks, currencies }) {
    const [backdropOpen, setBackdropOpen] = useState(false)

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
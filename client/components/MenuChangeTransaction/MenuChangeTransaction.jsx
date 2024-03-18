import React, { useState, useRef } from 'react';
import EditTransaction from '@/components/EditTransaction/EditTransaction'
import { Typography, Box, Backdrop, TextField, MenuItem } from '@mui/material';

function MenuChangeTransaction({ transaction, currency, handleTransactionsChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const transactionEditRef = useRef(null);

    const handleClose = (event) => {
        let parent = event?.target?.parentNode?.className.toString()
        if (parent && (parent.includes('Picker') ||
            parent.includes('MuiDay') ||
            parent.includes('MuiDate'))) {
            return;
        }
        if (
            (transactionEditRef.current &&
                !transactionEditRef.current.contains(event.target))
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    return (

        <React.Fragment>
            <MenuItem
                onClick={handleOpen}
                key={'editTransaction'} >
                Edit transaction
            </MenuItem>
            <EditTransaction transactionEditRef={transactionEditRef} handleClose={handleClose}
            backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen} 
            currency={currency} transaction={transaction} 
            handleTransactionsChange={handleTransactionsChange} />
        </React.Fragment>
    );
}
export default MenuChangeTransaction;
import React, { useState, useRef } from 'react';
import CreateTransaction from '@/components/Portfolio/CreateTransaction/CreateTransaction'
import styles from './createtransactionbutton.module.css';
import { Box } from '@mui/material';


function CreateTransactionButton({ currency, portfolio, handleTransactionsChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const transactionCreateRef = useRef(null);

    const handleClose = (event) => {
        let parent = event?.target?.parentNode?.className.toString()
        if (parent && (parent.includes('Picker') ||
            parent.includes('MuiDay') ||
            parent.includes('MuiDate'))) {
            return;
        }
        if (
            (transactionCreateRef.current &&
                !transactionCreateRef.current.contains(event.target))
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
                Add transaction
            </Box>
            <CreateTransaction currency={currency} portfolio={portfolio}
                handleTransactionsChange={handleTransactionsChange}
                transactionCreateRef={transactionCreateRef}
                handleOpen={handleOpen} handleClose={handleClose}
                backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen} />
        </React.Fragment>
    );
}
export default CreateTransactionButton;
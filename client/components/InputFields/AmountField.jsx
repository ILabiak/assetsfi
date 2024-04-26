import React from 'react';
import { TextField } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

const amountRegex = /^[-+]?\d+(\.\d{0,5})?$/;

function AmountField({ amount, setAmount, currency, title }) {

    const handleAmountChange = (value) => {
        if (value === '' || amountRegex.test(value)) {
            setAmount(value)
        }
    }

    return (
        <TextField
            required
            label={`${title} ${currency ? `(${currency?.symbol})` : ''}`}
            value={amount}
            autoComplete='off'
            onChange={(e) => {
                handleAmountChange(e.target.value);
            }}
            fullWidth
            sx={inputStyles.amountInput}
        />
    );
}
export default AmountField;
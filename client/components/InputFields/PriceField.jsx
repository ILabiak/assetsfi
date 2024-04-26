import React from 'react';
import {TextField } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

const priceRegex = /^[-+]?\d+(\.\d{0,5})?$/;


function PriceField({ price, setPrice, currency }) {

    const handlePriceChange = (value) => {
        if (priceRegex.test(value) || value=='') {
            setPrice(value)
        }
    }

    return (
        <TextField
            required
            label={`Price (${currency})`}
            value={price}
            onChange={(e) => {
                handlePriceChange(e.target.value);
            }}
            fullWidth
            sx={inputStyles.priceInput}
        />
    );
}
export default PriceField;
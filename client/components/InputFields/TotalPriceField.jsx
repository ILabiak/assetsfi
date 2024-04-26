import React from 'react';
import { TextField, } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

function TotalPriceField({ price, quantity, fees, currency }) {

    const calculatePrice = () => {
        let calculated = parseFloat(price) * parseFloat(Math.abs(quantity))
        if (parseFloat(fees) > 0) {
            calculated += parseFloat(fees)
        }
        calculated = calculated.toFixed(5).replace(/\.?0*$/, '')
        return !isNaN(calculated) ? calculated : '0';
    }

    return (
        <TextField
            label={`Total price (${currency})`}
            value={calculatePrice()}
            fullWidth
            sx={inputStyles.totalPriceInput}
        />
    );
}
export default TotalPriceField;
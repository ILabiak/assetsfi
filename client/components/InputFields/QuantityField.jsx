import React from 'react';
import { TextField } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

const quantityRegex = /^[-+]?\d+(\.\d{0,5})?$/;

function QuantityField({ quantity, setQuantity }) {

    const handleQuantityChange = (value) => {
        if (quantityRegex.test(value) || value == '' || value == '-') {
            setQuantity(value)
        }
    }

    return (
        <TextField
            required
            label="Quantity"
            value={quantity}
            onChange={(e) => {
                handleQuantityChange(e.target.value);
            }}
            fullWidth
            sx={inputStyles.quantityInput}
        />
    );
}
export default QuantityField;
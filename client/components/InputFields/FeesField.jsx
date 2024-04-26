import React, { useState, useEffect, useRef } from 'react';
import { TextField} from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

const feesRegex = /^[-+]?\d+(\.\d{0,5})?$/;


function FeesField({ fees, setFees, currency }) {

    const handleFeeChange = (value) => {
        if (feesRegex.test(value) || value=='') {
            setFees(value)
        }
    }

    return (
        <TextField
            label={`Fees (${currency})`}
            value={fees}
            onChange={(e) => {
                handleFeeChange(e.target.value);
            }}
            fullWidth
            sx={inputStyles.feesInput}
        />
    );
}
export default FeesField;
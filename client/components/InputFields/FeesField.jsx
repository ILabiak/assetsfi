import React, { useState, useEffect, useRef } from 'react';
import { TextField} from '@mui/material';

const feesRegex = /^[-+]?\d+(\.\d{0,5})?$/;


function FeesField({ fees, setFees, currency }) {

    const handleFeeChange = (value) => {
        if (feesRegex.test(value) || value=='') {
            setFees(value)
        }
    }

    return (
        <TextField
            id="outlined-required"
            label={`Fees (${currency})`}
            value={fees}
            onChange={(e) => {
                handleFeeChange(e.target.value);
            }}
            fullWidth
            sx={{
                marginBottom: '20px',
                '&:hover fieldset': {
                    border: '1px solid',
                    borderColor: 'white'
                },
                '& label': {
                    color: '#AEAEAE',
                },
                '& label.Mui-focused': {
                    color: '#AEAEAE',
                },
                input: {
                    backgroundColor: '#313337',
                    borderRadius: '5px',
                    color: '#E8E9EB',
                    fontSize: '16px',
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                },

            }}
        />
    );
}
export default FeesField;
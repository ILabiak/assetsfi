import React, { useState, useEffect, useRef } from 'react';
import {TextField } from '@mui/material';

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
            id="outlined-required"
            label={`Price (${currency})`}
            value={price}
            onChange={(e) => {
                handlePriceChange(e.target.value);
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
export default PriceField;
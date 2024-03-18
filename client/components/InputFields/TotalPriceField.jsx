import React, { useState, useEffect, useRef } from 'react';
import { TextField, } from '@mui/material';

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
            disabled
            id="outlined-required"
            label={`Total price (${currency})`}
            value={calculatePrice()}
            fullWidth
            sx={{
                marginBottom: '20px',
                '&:hover fieldset': {
                    border: '1px solid',
                    borderColor: 'white'
                },
                '& label.Mui-disabled': {
                    color: '#AEAEAE',
                },
                input: {
                    backgroundColor: '#313337',
                    borderRadius: '5px',
                    color: '#E8E9EB',
                    fontSize: '16px',
                },
                "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#AEAEAE",
                }
            }}
        />
    );
}
export default TotalPriceField;
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import styles from './searchfield.module.css';
import { Typography, Box, TextField, List, ListItem } from '@mui/material';


function SelectorField({ selectorData, currentValue, setValue, label, helperText }) {
    return (
        <Box>

            <TextField
                // id="outlined-select-currency-native"
                select
                // label={label}
                // value={currentValue}
                onChange={(event) => {
                    setValue(selectorData[event.target.value])
                }}
                key={`${currentValue.id}-key`}
                fullWidth
                SelectProps={{
                    native: true,
                }}
                helperText={helperText}
                sx={{
                    mb: '10px',
                    '&:hover fieldset': {
                        border: '1px solid',
                        borderColor: 'white'
                    },
                    '& label': {
                        display: 'none',
                    },
                    '& label.Mui-focused': {
                        display: 'inline',
                        color: '#AEAEAE',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            color: 'white',
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                    },
                    '.MuiInputBase-input': { color: '#E8E9EB', backgroundColor: '#313337' },
                    '.MuiFormHelperText-root': {
                        color: '#AEAEAE'
                    }
                }}
            >
                {selectorData.map((option, index) => (
                    <option selected={currentValue.id == option.id} key={`opt-${option.id}`} value={index}>
                        {option.name}
                    </option>
                ))}
            </TextField>
        </Box>
    );
}
export default SelectorField;
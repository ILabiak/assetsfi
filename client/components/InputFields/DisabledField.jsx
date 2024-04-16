import React, { useState, useEffect, useRef } from 'react';
import { TextField, Typography } from '@mui/material';

function DisabledField({ value, title }) {

    return (
        <>
            <Typography sx={{
                color: '#AEAEAE'
            }}>
                {title}
            </Typography>
            <TextField
                required
                // label={title}
                value={value}
                autoComplete='off'
                onChange={() => { }}
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
                            border: '0',
                        },
                        '&.Mui-focused:hover fieldset': {
                            border: '0',
                        },
                        '&:hover fieldset': {
                            border: '0',
                        },
                    },

                }}
            />
        </>
    );
}
export default DisabledField;
import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

const textRegex = /^.{0,70}$/;

function TextDataField({ text, setText, title }) {

    const handleNoteChange = (value) => {
        if (textRegex.test(value) || value == '') {
            setText(value)
        }
    }

    return (
        <TextField
            id="outlined"
            label={title}
            required
            value={text}
            onChange={(e) => {
                handleNoteChange(e.target.value);
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
export default TextDataField;
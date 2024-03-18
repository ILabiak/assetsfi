import React, { useState, useEffect, useRef } from 'react';
import { TextField, } from '@mui/material';

const noteRegex = /^.{0,150}$/;

function NoteField({ note, setNote }) {

    const handleNoteChange = (value) => {
        if (noteRegex.test(value) || value == '') {
            setNote(value)
        }
    }

    return (
        <TextField
            id="outlined"
            label="Note"
            value={note}
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
export default NoteField;
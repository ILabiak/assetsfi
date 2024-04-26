import React from 'react';
import { TextField } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

const textRegex = /^.{0,70}$/;

function TextDataField({ text, setText, title, required }) {

    const handleNoteChange = (value) => {
        if (textRegex.test(value) || value == '') {
            setText(value)
        }
    }

    return (
        <TextField
            label={title}
            required={required}
            value={text}
            onChange={(e) => {
                handleNoteChange(e.target.value);
            }}
            fullWidth
            sx={inputStyles.textInput}
        />
    );
}
export default TextDataField;
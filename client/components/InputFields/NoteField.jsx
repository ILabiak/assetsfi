import React from 'react';
import { TextField, } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

const noteRegex = /^.{0,150}$/;

function NoteField({ note, setNote }) {

    const handleNoteChange = (value) => {
        if (noteRegex.test(value) || value == '') {
            setNote(value)
        }
    }

    return (
        <TextField
            label="Note"
            value={note}
            onChange={(e) => {
                handleNoteChange(e.target.value);
            }}
            fullWidth
            sx={inputStyles.noteInput}
        />
    );
}
export default NoteField;
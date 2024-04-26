import React from 'react';
import { TextField, Typography } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';

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
                value={value}
                autoComplete='off'
                onChange={() => { }}
                fullWidth
                sx={inputStyles.disabledInput}
            />
        </>
    );
}
export default DisabledField;
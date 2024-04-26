import React from 'react';
import { Box, TextField } from '@mui/material';
import inputStyles from '@/components/themesMUI/InputStyles';


function SelectorField({ selectorData, currentValue, setValue, label, helperText }) {
    return (
        <Box>
            <TextField
                select
                onChange={(event) => {
                    setValue(selectorData[event.target.value])
                }}
                key={`${currentValue.id}-key`}
                fullWidth
                SelectProps={{
                    native: true,
                }}
                helperText={helperText}
                sx={inputStyles.selectorInput}
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
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



function DateField({ date, setDate }) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label='Date'
                slotProps={{
                    openPickerIcon: { fontSize: 'large' },
                    openPickerButton: {
                        sx: {
                            backgroundColor: '#313337',
                            color: 'white'
                        }
                    },
                    textField: {
                        inputProps: {
                            sx: {
                                color: '#E8E9EB'
                            }
                        },
                        sx: {
                            backgroundColor: '#313337',
                            width: '100%',
                            borderRadius: '5px',
                            color: '#E8E9EB',
                            fontSize: '16px',
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
                            '& label': {
                                color: '#AEAEAE',
                            },
                            '& label.Mui-focused': {
                                color: '#AEAEAE',
                            },
                        }
                    },
                }}
                value={date} onChange={(value) => setDate(value)}
                views={['year', 'month', 'day']}
            />
        </LocalizationProvider>
    );
}
export default DateField;
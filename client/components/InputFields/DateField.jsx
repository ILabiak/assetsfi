import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import inputStyles from '@/components/themesMUI/InputStyles';

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
                        sx: inputStyles.dateInput
                    },
                }}
                value={date} onChange={(value) => setDate(value)}
                views={['year', 'month', 'day']}
            />
        </LocalizationProvider>
    );
}
export default DateField;
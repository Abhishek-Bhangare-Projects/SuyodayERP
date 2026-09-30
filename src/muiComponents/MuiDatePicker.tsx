import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import React from 'react';

export interface MuiDatePickerProps extends Omit<DatePickerProps<Dayjs>, 'renderInput'> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const MuiDatePicker: React.FC<MuiDatePickerProps> = ({
  label,
  error,
  helperText,
  slotProps,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        slotProps={{
          ...slotProps,
          textField: {
            size: 'small',
            fullWidth: true,
            error: error,
            helperText: helperText,
            ...(slotProps?.textField as any),
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default MuiDatePicker;

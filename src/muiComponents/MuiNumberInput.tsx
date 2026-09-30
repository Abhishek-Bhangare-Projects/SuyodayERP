import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import * as React from 'react';

export type MuiNumberInputProps = Omit<TextFieldProps, 'variant' | 'type'> & {
  label?: string;
  name?: string;
  required?: boolean;
  min?: number;
  max?: number;
  allowDecimals?: boolean;
};

export const MuiNumberInput: React.FC<MuiNumberInputProps> = ({
  label,
  name,
  error,
  helperText,
  value,
  min,
  max,
  allowDecimals = true,
  required,
  onChange,
  onBlur,
  slotProps,
  ...others
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Filter numeric characters
    if (allowDecimals) {
      val = val.replace(/[^0-9.]/g, '');
      const parts = val.split('.');
      if (parts.length > 2) {
        val = parts[0] + '.' + parts.slice(1).join('');
      }
    } else {
      val = val.replace(/[^0-9]/g, '');
    }

    if (min !== undefined && val !== '' && Number(val) < min) {
      val = String(min);
    }
    if (max !== undefined && val !== '' && Number(val) > max) {
      val = String(max);
    }

    onChange?.({
      ...e,
      target: {
        ...e.target,
        value: val,
      },
    });
  };

  return (
    <TextField
      {...others}
      type="text"
      value={value ?? ''}
      label={label}
      name={name}
      fullWidth
      size="small"
      variant="outlined"
      error={!!error}
      helperText={helperText}
      required={required}
      onChange={handleChange}
      onBlur={onBlur}
      slotProps={{
        ...slotProps,
        inputLabel: {
          ...(slotProps?.inputLabel as any),
          shrink: value !== undefined && value !== '' ? true : undefined,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '0.925rem',
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.875rem',
        },
        ...others.sx,
      }}
    />
  );
};

export default MuiNumberInput;

import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import * as React from 'react';

export type MuiTextInputProps = Omit<TextFieldProps, 'variant'> & {
  label?: string;
  name?: string;
  required?: boolean;
};

export const MuiTextInput: React.FC<MuiTextInputProps> = ({
  label,
  name,
  error,
  helperText,
  value,
  slotProps,
  required,
  onChange,
  onBlur,
  ...others
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/^\s+/, '');

    onChange?.({
      ...e,
      target: {
        ...e.target,
        value: val,
      },
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.trim();

    onChange?.({
      ...e,
      target: {
        ...e.target,
        value: val,
      },
    });

    onBlur?.(e);
  };

  return (
    <TextField
      {...others}
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
      onBlur={handleBlur}
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

export default MuiTextInput;

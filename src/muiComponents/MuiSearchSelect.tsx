import Autocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface MuiSearchSelectProps
  extends Omit<AutocompleteProps<SelectOption, false, false, false>, 'renderInput' | 'options'> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export const MuiSearchSelect: React.FC<MuiSearchSelectProps> = ({
  options = [],
  label,
  placeholder,
  error,
  helperText,
  required,
  value,
  onChange,
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option?.label || ''}
      isOptionEqualToValue={(option, val) => option?.value === val?.value}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          size="small"
          required={required}
          error={error}
          helperText={helperText}
          fullWidth
        />
      )}
      {...props}
    />
  );
};

export default MuiSearchSelect;

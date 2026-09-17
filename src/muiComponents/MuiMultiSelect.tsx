import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React from 'react';
import type { SelectOption } from './MuiSearchSelect';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface MuiMultiSelectProps {
  options: SelectOption[];
  value: SelectOption[];
  onChange: (event: any, newValue: SelectOption[]) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
}

export const MuiMultiSelect: React.FC<MuiMultiSelectProps> = ({
  options = [],
  value = [],
  onChange,
  label,
  placeholder,
  error,
  helperText,
  disabled,
  required,
}) => {
  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      value={value}
      onChange={onChange}
      disabled={disabled}
      getOptionLabel={(option) => option?.label || ''}
      isOptionEqualToValue={(option, val) => option?.value === val?.value}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={String(option.value)}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.label}
        </li>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={String(option.value)}
            label={option.label}
            size="small"
            sx={{ borderRadius: '6px' }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={value.length === 0 ? placeholder : ''}
          size="small"
          required={required}
          error={error}
          helperText={helperText}
          fullWidth
        />
      )}
    />
  );
};

export default MuiMultiSelect;

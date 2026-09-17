import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';

export interface MuiCheckBoxProps extends CheckboxProps {
  label?: string;
}

export const MuiCheckBox: React.FC<MuiCheckBoxProps> = ({
  label,
  checked,
  onChange,
  disabled,
  ...props
}) => {
  if (label) {
    return (
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} disabled={disabled} {...props} />}
        label={label}
      />
    );
  }

  return <Checkbox checked={checked} onChange={onChange} disabled={disabled} {...props} />;
};

export default MuiCheckBox;

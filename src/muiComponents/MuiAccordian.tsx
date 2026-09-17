import Accordion, { type AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

export interface MuiAccordianProps extends Omit<AccordionProps, 'children' | 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const MuiAccordian: React.FC<MuiAccordianProps> = ({
  title,
  subtitle,
  children,
  defaultExpanded,
  sx,
  ...props
}) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        borderRadius: '10px !important',
        mb: 1.5,
        border: '1px solid #e2e8f0',
        '&:before': { display: 'none' },
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        ...sx,
      }}
      {...props}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}>
        <div>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.825rem' }}>
              {subtitle}
            </Typography>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default MuiAccordian;

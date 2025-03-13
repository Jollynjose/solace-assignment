import { TableBody, Tooltip, Typography } from '@mui/material';
import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { TAdvocatesWithSpecialities } from '@/types';

interface Props {
  data: TAdvocatesWithSpecialities[];
}

function AdvocatesTableEntriesBody({ data }: Props) {
  return data.map((advocate) => {
    const isTooltipNeeded = advocate.specialities.length > 3;
    const specialities = advocate.specialities.map((s) => s.name);

    const specialitiesToDisplay = isTooltipNeeded
      ? specialities.slice(0, 2)
      : specialities;

    const restOfSpecialities = isTooltipNeeded ? specialities.slice(2) : [];

    return (
      <TableRow
        key={`advocates-${advocate.id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {advocate.firstName}
        </TableCell>
        <TableCell>{advocate.lastName}</TableCell>
        <TableCell>{advocate.degree}</TableCell>
        <TableCell>{advocate.yearsOfExperience}</TableCell>
        <TableCell>{advocate.city}</TableCell>
        <TableCell>{advocate.phoneNumber}</TableCell>
        <TableCell>
          {specialitiesToDisplay.join(', ')}
          {isTooltipNeeded && (
            <Tooltip
              title={restOfSpecialities.join(', ')}
              arrow
              placement="top"
            >
              <Typography
                variant="body2"
                component="span"
                sx={{
                  color: '#0A6CCC',
                  cursor: 'pointer',
                }}
              >
                {`, +${restOfSpecialities.length}`}
              </Typography>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    );
  });
}

export default AdvocatesTableEntriesBody;

/* eslint-disable no-unused-vars */
import { styled, TableCell, tableCellClasses } from '@mui/material';

const CustomTableCell = styled(TableCell)((_) => ({
  textAlign: 'center',
  borderBottom: 'inherit',

  '&:last-child': {
    borderRight: 'none',
  },
}));

export default CustomTableCell;

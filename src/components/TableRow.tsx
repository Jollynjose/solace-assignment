import { styled, TableRow, tableRowClasses } from '@mui/material';

const CustomTableRow = styled(TableRow)((_) => ({
  [`&.${tableRowClasses.head}`]: {
    backgroundColor: '#e0e7ec',
    '& p': {
      fontWeight: 400,
    },
  },
}));

export default CustomTableRow;

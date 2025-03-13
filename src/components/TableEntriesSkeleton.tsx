import { Skeleton } from '@mui/material';
import CustomTableCell from './TableCell';
import CustomTableRow from './TableRow';

interface Props {
  cols: number;
  rows: number;
}

const TableEntriesSkeleton = ({ cols, rows }: Props) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <CustomTableRow key={`${i}-row`}>
          {[...Array(cols)].map((_, j) => (
            <CustomTableCell key={`${j}-${i}-cell`}>
              <Skeleton animation="wave" variant="text" />
            </CustomTableCell>
          ))}
        </CustomTableRow>
      ))}
    </>
  );
};

export default TableEntriesSkeleton;

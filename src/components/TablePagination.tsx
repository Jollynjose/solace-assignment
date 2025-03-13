import {
  TablePaginationProps,
  TablePagination as Pagination,
} from '@mui/material';
import React from 'react';

function TablePagination(props: TablePaginationProps) {
  return (
    <Pagination
      showFirstButton
      showLastButton
      component="div"
      {...props}
      sx={{
        ...props.sx,
        cursor: 'pointer',
        '&& .Mui-selected': {
          borderRadius: '8px',
          border: `2px solid #2196F3`,
          color: '#2196F3',
        },
      }}
    />
  );
}

export default TablePagination;

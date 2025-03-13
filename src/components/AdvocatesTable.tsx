'use-client';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import TableRow from './TableRow';
import TableCell from './TableCell';
import AdvocatesTableEntriesBody from './AdvocatesTableEntriesBody';
import TablePagination from './TablePagination';
import { TAdvocatesParams } from '@/validators';
import useFetch from '@/hooks/useFetch';
import { TAdvocatesResponse } from '@/types';
import TableEntriesSkeleton from './TableEntriesSkeleton';
import { useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const ROWS_PER_PAGE = 10;

const COLUMNS = [
  {
    id: 'firstName',
    label: 'First Name',
  },
  {
    id: 'lastName',
    label: 'Last Name',
  },
  {
    id: 'degree',
    label: 'Degree',
  },
  {
    id: 'yearsOfExperience',
    label: 'Years of Experience',
  },
  {
    id: 'city',
    label: 'City',
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
  },
  {
    specialities: 'specialities',
    label: 'Specialities',
  },
];

interface Props {
  params: Partial<TAdvocatesParams>;
}

const AdvocatesTable = ({ params }: Props) => {
  const searchQuery = useSearchParams();
  const pathname = usePathname();

  const offset = params?.offset ?? 0;

  const router = useRouter();

  const queryParams = useMemo(() => {
    const paramsBuilder = new URLSearchParams();

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value) {
        paramsBuilder.set(key, value.toString());
      }
    });
    const paramsToString = paramsBuilder.toString();
    const queryParams = paramsToString ? `?${paramsToString}` : '';

    return queryParams;
  }, [params]);

  const { data: advocatesResults, loading } = useFetch<TAdvocatesResponse>(
    `${process.env.API_URL}/advocates${queryParams}`,
  );

  const tableBodyMemorized = useMemo(
    () => (
      <TableBody aria-label="advocates table body">
        {loading ? (
          <TableEntriesSkeleton cols={COLUMNS.length} rows={ROWS_PER_PAGE} />
        ) : (
          <AdvocatesTableEntriesBody data={advocatesResults?.data ?? []} />
        )}
      </TableBody>
    ),
    [advocatesResults, loading],
  );

  const pageNumber = Math.floor(offset / ROWS_PER_PAGE);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="advocates table">
        <TableHead aria-label="advocates table header">
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell
                key={`advocates-header-${column.id}`}
                sx={{
                  backgroundColor: '#e7f3ff',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {tableBodyMemorized}
      </Table>
      <TablePagination
        count={advocatesResults?.total ?? 0}
        page={pageNumber}
        onPageChange={(_, v) => {
          const value = v * ROWS_PER_PAGE;
          const newParams = new URLSearchParams(searchQuery);
          newParams.set('offset', value.toString());

          router.replace(`${pathname}?${newParams.toString()}`);
        }}
        rowsPerPage={ROWS_PER_PAGE}
        onRowsPerPageChange={() => {}}
        rowsPerPageOptions={[10]}
        aria-label="advocates table pagination"
      />
    </TableContainer>
  );
};

export default AdvocatesTable;

'use client';
import AdvocatesTable from '@/components/AdvocatesTable';
import { SearchInput } from '@/components';
import { Box, Typography } from '@mui/material';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();

  const params = {
    search: searchParams.get('search'),
    offset: searchParams.get('offset'),
  };

  const offset = !Number.isNaN(params?.offset) ? Number(params?.offset) : 0;

  const search = params?.search ?? undefined;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.525rem',
        padding: '1.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant="h1">Solace Advocates</Typography>

        <SearchInput debounceTime={500} />
      </Box>

      <Suspense key={`${search}-${offset}`}>
        <AdvocatesTable
          params={{
            search: search,
            offset,
            limit: 10,
            orderBy: 'id',
            orderType: 'ASC',
          }}
        />
      </Suspense>
    </Box>
  );
}

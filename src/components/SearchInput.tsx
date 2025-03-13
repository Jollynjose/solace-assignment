import { Input, InputProps, SxProps } from '@mui/material';
import { ChangeEvent, MouseEventHandler } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps extends InputProps {
  inputPlaceholder?: string;
  readOnly?: boolean;
  debounceTime: number;
  onClickFunction?: MouseEventHandler;
  sx?: SxProps;
}

export function SearchInput({
  readOnly,
  debounceTime,
  onClickFunction,
  sx,
  ...rest
}: SearchInputProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, debounceTime);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSearch(value);
  };

  return (
    <Input
      disableUnderline
      type="text"
      readOnly={readOnly}
      onClick={onClickFunction}
      onChange={handleInputChange}
      defaultValue={searchParams.get('query')}
      sx={{
        border: `2px solid #e0e7ec`,
        color: '#252a2f',
        width: { sx: '100%', sm: 'auto' },
        padding: '0.2rem 0.8rem',
        height: '2rem',
        lineHeight: 1,
        fontSize: '1rem',
        fontWeight: 400,
        '& ::placeholder': {
          color: '#252a2f',
        },
      }}
      placeholder="Search"
      {...rest}
    />
  );
}

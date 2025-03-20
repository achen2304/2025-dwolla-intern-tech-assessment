import * as React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import type { Customer } from '../pages';

// Define the types for the sort field and order
export type SortField = 'firstName' | 'lastName' | 'email' | 'businessName';
export type SortOrder = 'asc' | 'desc';

// Define the props for the SortBy component
interface SortByProps {
  data: Customer[];
  onSortedDataChange: (sortedData: Customer[]) => void;
}

const SortBy = ({ data, onSortedDataChange }: SortByProps) => {
  const [field, setField] = React.useState<SortField>('firstName');
  const [order, setOrder] = React.useState<SortOrder>('asc');

  const handleSort = React.useCallback(() => {
    if (!data) return;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[field]?.toLowerCase() || '';
      const bValue = b[field]?.toLowerCase() || '';

      if (order === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    onSortedDataChange(sorted);
  }, [data, field, order, onSortedDataChange]);

  React.useEffect(() => {
    handleSort();
  }, [handleSort]);

  const handleFieldChange = (event: SelectChangeEvent) => {
    setField(event.target.value as SortField);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as SortOrder);
  };

  // Render the component
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl
        size="small"
        sx={{
          minWidth: 200,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'white',
          },
        }}
      >
        <InputLabel>Sort by</InputLabel>
        <Select value={field} label="Sort by" onChange={handleFieldChange}>
          <MenuItem value="firstName">First Name</MenuItem>
          <MenuItem value="lastName">Last Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="businessName">Business Name</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          minWidth: 120,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'white',
          },
        }}
      >
        <InputLabel>Order</InputLabel>
        <Select value={order} label="Order" onChange={handleOrderChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBy;

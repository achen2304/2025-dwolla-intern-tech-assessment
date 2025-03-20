import * as React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Define the props for the Search component
interface SearchProps {
  value: string;
  data: any[];
  onDataChange: (filteredData: any[]) => void;
  onSearch: (value: string) => void;
}

// Define the Search component
const Search = ({
  value,
  data,
  onDataChange,
  onSearch,
}: SearchProps) => {
  const handleSearch = (searchValue: string) => {
    onSearch(searchValue);
    if (!searchValue) {
      onDataChange(data);
      return;
    }

    const filtered = data.filter(
      (customer) =>
        customer.firstName
          .toLowerCase()
          .startsWith(searchValue.toLowerCase()) ||
        customer.lastName.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    onDataChange(filtered);
  };

  return (
    <TextField
      fullWidth
      value={value}
      placeholder="Search by name..."
      variant="outlined"
      onChange={(e) => handleSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 3,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          borderRadius: '8px',
        },
      }}
    />
  );
};

export default Search;

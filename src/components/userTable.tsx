import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useTheme,
  Snackbar,
} from '@mui/material';
import type { Customer, Customers } from '../pages/index';
import Search from './search';
import AddUser from './addUser';
import SortBy from './sortBy';

function UserTable({ data }: { data: Customers }) {
  const theme = useTheme();
  const [processedData, setProcessedData] = React.useState(data);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notification, setNotification] = React.useState(false);

  const customerCount = React.useMemo(() => {
    return processedData?.length || 0;
  }, [processedData]);

  return (
    <Box sx={{ width: '90%', margin: '32px auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        {/* Header */}
        <Box>
          <Typography
            variant="h4"
            sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
          >
            Customer List
          </Typography>
          {/* Customer count */}
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.text.secondary }}
          >
            {customerCount} {customerCount === 1 ? 'customer' : 'customers'}
          </Typography>
        </Box>
      </Box>
      {/* Search */}
      <Search
        value={searchQuery}
        data={data}
        onDataChange={setProcessedData}
        onSearch={setSearchQuery}
      />
      {/* Add user and sort by */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <AddUser onSuccess={() => setNotification(true)} />
        <SortBy data={processedData} onSortedDataChange={setProcessedData} />
      </Box>
      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Table>
          {/* Table head */}
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                First Name
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                Last Name
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                Business Name
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {processedData?.map((customer) => (
              <TableRow
                key={customer.email}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.selected,
                    transition: 'background-color 0.2s ease',
                  },
                }}
              >
                <TableCell sx={{ py: 2 }}>{customer.firstName}</TableCell>
                <TableCell sx={{ py: 2 }}>{customer.lastName}</TableCell>
                <TableCell sx={{ py: 2 }}>{customer.email}</TableCell>
                <TableCell sx={{ py: 2 }}>
                  {customer.businessName || '—'}
                </TableCell>
              </TableRow>
            ))}
            {/* No customers found */}
            {processedData?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 2 }}>
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Notification for adding a new customer */}
      <Snackbar
        open={notification}
        autoHideDuration={2000}
        onClose={() => setNotification(false)}
        message="Customer added successfully"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            justifyContent: 'center',
            minWidth: '200px',
          },
        }}
      />
    </Box>
  );
}

export default UserTable;

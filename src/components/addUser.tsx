import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import { AddRounded, Close as CloseIcon } from '@mui/icons-material';
import type { Customer } from '../pages';
import axios from 'axios';
import { mutate } from 'swr';

interface AddUserProps {
  onSuccess: () => void;
}

const AddUser = ({ onSuccess }: AddUserProps) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState<Customer>({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      businessName: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/customers', formData);
      await mutate('/api/customers');
      onSuccess();
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError('Failed to add customer');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddRounded />}
        onClick={handleOpen}
        sx={{
          height: '40px',
          borderRadius: '8px',
          textTransform: 'none',
          px: 2,
        }}
      >
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Add New Customer
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  },
                }}
              />
              <TextField
                required
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  },
                }}
              />
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  },
                }}
              />
              <TextField
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  },
                }}
              />
              {error && <Box sx={{ color: 'error.main', mt: 1 }}>{error}</Box>}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleClose}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
              }}
            >
              Add Customer
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddUser;

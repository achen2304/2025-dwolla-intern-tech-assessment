import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Define the LoadingSkeleton component
const LoadingSkeleton = () => {
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
        <Box>
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="text" width={120} height={20} />
        </Box>
      </Box>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={40}
        sx={{ mb: 3, borderRadius: '8px' }}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          sx={{ borderRadius: '8px' }}
        />
        <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={40}
            sx={{ borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            width={120}
            height={40}
            sx={{ borderRadius: '8px' }}
          />
        </Box>
      </Box>

      <Paper sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" width="100%" height={56} />
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              p: 2,
              borderBottom: '1px solid rgba(224, 224, 224, 1)',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Skeleton variant="text" width="22%" sx={{ mr: 2 }} />
            <Skeleton variant="text" width="22%" sx={{ mr: 2 }} />
            <Skeleton variant="text" width="30%" sx={{ mr: 2 }} />
            <Skeleton variant="text" width="20%" />
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default LoadingSkeleton;

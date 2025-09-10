import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthWrapper from './AuthWrapper';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: 'white' }} size={60} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <AuthWrapper />;
  }

  return children;
};

export default ProtectedRoute;

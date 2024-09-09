import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

const BillingManagement = ({ email }) => {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionUrl = async () => {
      if (!email) {
        setError('Email is not available');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/get-stripe-session-id?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session ID');
        }
        const data = await response.json();
        setSessionId(data.sessionId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionUrl();
  }, [email]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!sessionId) return <div>No session found</div>;

  return (
    <Box
      component="form"
      action="/create-portal-session"
      method="POST"
      sx={{ mt: 2 }}
    >
      <input
        type="hidden"
        id="session-id"
        name="session_id"
        value={sessionId}
      />
      <Button
        id="checkout-and-portal-button"
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Manage your billing information
      </Button>
    </Box>
  );
};

export default BillingManagement;
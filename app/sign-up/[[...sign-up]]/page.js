'use client';
import { SignUp } from '@clerk/clerk-react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
import Navbar from '@/app/components/Navbar';

export default function SignUpPage() {
  return (
    <Container
      maxWidth='xl'
      disableGutters
      sx={{
        background:
          'linear-gradient(to bottom, rgb(245, 245, 245), rgb(130, 290, 274), rgb(245, 245, 245))',
        // height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Navbar />
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        sx={{ mt: 5, mb: 5 }}
      >
        <Typography variant='h4' sx={{mb: 3}}>Sign Up</Typography>
        <SignUp />
      </Box>
    </Container>
  );
}

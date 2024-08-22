'use client';
import { SignIn } from '@clerk/clerk-react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
import Navbar from '../../components/Navbar';

export default function SignInPage() {
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
       sx={{
        mt: 5
       }}
      >
        <Typography variant='h4'>Sign In</Typography>
        <SignIn />
      </Box>
    </Container>
  );
}

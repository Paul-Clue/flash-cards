'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Typography, AppBar, Toolbar, Button, Box } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
  const router = useRouter();
  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100px',
        borderTop: '2px solid gray',
      }}
    >
      <Toolbar>
        <Button href='/'>
          <Typography
            variant='h6'
            style={{
              flexGrow: 1,
              color: 'black',
              fontSize: '.8em',
            }}
          >
            copyright{' '}
            <CopyrightIcon
              sx={{ flexGrow: 1, color: 'black', fontSize: '.8em' }}
            />{' '}
            2024 Fast-Cards
          </Typography>
        </Button>
      </Toolbar>

      {/* <SignedOut>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button href='/sign-in' sx={{ color: 'black' }}>
            {' '}
            Login
          </Button>
          <Button href='/sign-up' sx={{ color: 'black' }}>
            {' '}
            Signup
          </Button>
        </Box>
      </SignedOut>
      <SignedIn>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          <Button
            color='inherit'
            sx={{ color: 'black', fontWeight: 'bold' }}
            onClick={() => router.push('/generate')}
          >
            {' '}
            Generate Fast-Cards
          </Button>
          <Button
            color='inherit'
            sx={{ color: 'black', fontWeight: 'bold', mr: 3, }}
            onClick={() => router.push('/flashcards')}
          >
            {' '}
            Your Fast-Cards
          </Button>
          <UserButton />
        </Box>
      </SignedIn> */}
    </AppBar>
  );
}

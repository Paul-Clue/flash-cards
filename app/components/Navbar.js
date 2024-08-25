'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './Menu';

export default function Navbar() {
  const router = useRouter();
  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon sx={{color: 'black'}}/>
    </IconButton> */}
        <Menu />
        <Button href='/' sx={{display: {xs: 'none', md: 'flex'}}}>
          <Typography
            variant='h6'
            style={{
              flexGrow: 1,
              color: 'black',
              textShadow:
                '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
              fontWeight: 'bolder',
            }}
          >
            Fast-Cards
          </Typography>
        </Button>
      </Toolbar>

      <SignedOut>
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
            sx={{ color: 'black', fontWeight: 'bold', display: {xs: 'none', md: 'flex'} }}
            onClick={() => router.push('/generate')}
          >
            {' '}
            Generate Fast-Cards
          </Button>
          <Button
            color='inherit'
            sx={{ color: 'black', fontWeight: 'bold', mr: 3, display: {xs: 'none', md: 'flex'} }}
            onClick={() => router.push('/flashcards')}
          >
            {' '}
            Your Fast-Cards
          </Button>
          <UserButton />
        </Box>
      </SignedIn>
    </AppBar>
  );
}

'use client';
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
      <Button href='/privacy-policy' sx={{ mr: 4 }}>
        <Typography
          variant='h6'
          style={{
            flexGrow: 1,
            color: 'black',
            fontSize: '.8em',
          }}
        >
          Privacy Policy
        </Typography>
      </Button>
    </AppBar>
  );
}

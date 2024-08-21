'use client';
import Image from 'next/image';
// import getStripe from '../utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import {
  Typography,
  Container,
  AppBar,
  Grid,
  Toolbar,
  Button,
  Box,
} from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <Container
      maxWidth='xl'
      disableGutters
      sx={{
        // background:
        // "linear-gradient(to bottom, rgb(239, 245, 231), rgb(198, 184, 162))",
        background:
          'linear-gradient(to bottom, rgb(245, 245, 245), rgb(130, 290, 274), rgb(245, 245, 245))',
        // padding: 0,
        height: '100%',
      }}
    >
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create flashcard from your text' />
      </Head>

      <AppBar
        position='static'
        // sx={{ border: '1px solid', borderColor: 'grey.300' }}
      >
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Flashcard Sass
          </Typography>

          <SignedOut>
            <Button color='inherit' href='/sign-in'>
              {' '}
              Login
            </Button>
            <Button color='inherit' href='/sign-up'>
              {' '}
              Signup
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: 'absolute',
          top: '59%',
          left: '79%',
          transform: 'translate(-50%, -50%)',
          // transform: 'translate(-50%, -50%) rotate(-50deg)',
          opacity: '100%',
          zIndex: 0,
          display: {xs: 'none', md: 'block'}
        }}
      >
        <Image
          // src='/flashcards2.png'
          src='/flashcards3.webp'
          alt='Blank flashcards'
          width={500}
          height={500}
          sx={{
            zIndex: -1,
          }}
        />
      </Box>
      {/* Show on small screen */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 10,
          mt: 10,
          display: {xs: 'block', md: 'none'}
          // position: 'relative',
          // right: '20%',
          // zIndex: 10,
        }}
      >
        <Typography variant='h2' gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant='h5'>
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <SignedOut>
          <Button
            variant='contained'
            href='/sign-in'
            color='primary'
            sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
          >
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            variant='contained'
            href='/generate'
            color='primary'
            sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
          >
            Start making cards
          </Button>
        </SignedIn>
      </Box>
      {/* Show on medium and up screens */}
      <Box
        sx={{
          display: {xs: 'none', md: 'block'},
          textAlign: 'center',
          mb: 20,
          mt: 10,
          position: 'relative',
          right: '20%',
          zIndex: 10,
        }}
      >
        <Typography variant='h2' gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant='h5'>
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <SignedOut>
          <Button
            variant='contained'
            href='/sign-in'
            color='primary'
            sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
          >
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            variant='contained'
            href='/generate'
            color='primary'
            sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
          >
            Start making cards
          </Button>
        </SignedIn>
      </Box>
      <Box
        sx={{
          my: 6,
          padding: 5,
          zIndex: 10,
        }}
      >
        <Typography variant='h4' components='h2' gutterBottom>
          {' '}
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {' '}
              Simply input your text adn let our software do the rest. Creating
              flashCards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>
              Smart FlashCards
            </Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise
              flashcards, perfect for stuying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ zIndex: 10 }}>
            <Typography variant='h6'>Accsible anywhere</Typography>
            <Typography>
              {' '}
              Aces your flashcards from any device at any time. Study on the go
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center', padding: 5 }}>
        <Typography variant='h4' gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '5px solid',
                borderColor: 'grey.300',
                // backgroundColor: 'whitesmoke',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant='h5' gutterBottom>
                Basic
              </Typography>
              <Typography variant='h6' gutterBottom>
                $5/Month
              </Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage
              </Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
              >
                {' '}
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '5px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant='h5' gutterBottom>
                Pro
              </Typography>
              <Typography variant='h6' gutterBottom>
                $10/Month
              </Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
              >
                {' '}
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

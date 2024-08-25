'use client';
import Image from 'next/image';
import getStripe from '../utils/getStripe';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Typography, Container, Grid, Button, Box } from '@mui/material';
import Head from 'next/head';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

export default function Home() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState(false);

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'https://fstcards.com' },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const checkSubscription = async (email) => {
    const stripe = await getStripe();
    try {
      console.log(' Checking subscription for email: ', email);
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customers.data.length === 0) {
        console.log('No customer found with this email.');
        return;
      }

      const customerId = customers.data[0].id;
      console.log('Customer ID: ', customerId);

      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
      });

      if (subscriptions.data.length > 0) {
        console.log('Subscription found: ', subscriptions.data[0]);
        setSubscription(true);
      } else {
        console.log('No active subscription found.');
        setSubscription(false);
      }
    } catch (error) {
      console.error('Error checking subscription', error);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    checkSubscription(user.primaryEmailAddress.emailAddress);
  }, [user]);

  return (
    <Container
      maxWidth='xl'
      disableGutters
      sx={{
        background:
          'linear-gradient(to top right, rgb(130, 290, 274), rgb(245, 245, 245), rgb(130, 290, 274), rgb(245, 245, 245) )',

        height: '100%',
      }}
    >
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create flashcard from your text' />
      </Head>
      <Navbar />
      <Box
        sx={{
          position: 'absolute',
          top: '59%',
          left: '79%',
          transform: 'translate(-50%, -50%)',
          opacity: '100%',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Image
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
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Typography
          variant='h2'
          gutterBottom
          sx={{
            color: 'black',
            fontWeight: 'bold',
            textShadow:
              '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
            fontWeight: 'bolder',
          }}
        >
          Welcome to Fast-Cards
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
          display: { xs: 'none', md: 'block' },
          textAlign: 'center',
          mb: 20,
          mt: 10,
          position: 'relative',
          right: '20%',
          zIndex: 10,
        }}
      >
        <Typography
          variant='h2'
          gutterBottom
          sx={{
            color: 'black',
            fontWeight: 'bold',
            textShadow:
              '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
            fontWeight: 'bolder',
          }}
        >
          Welcome to Fast-Cards
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
        <Typography
          variant='h4'
          components='h2'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
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
              Simply input your text and let our software do the rest.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6' gutterBottom>
              Smart Fast-Cards
            </Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise
              Fast-Cards, perfect for studying. Some Fast-Cards will generate
              Wikipedia and/or YouTube links for a deeper dive into the topic.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ zIndex: 10 }}>
            <Typography variant='h6'>Accessible anywhere</Typography>
            <Typography>
              {' '}
              Access your Fast-Cards from any device at any time. Study on the
              go
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center', padding: 5 }}>
        <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
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
                Basic
              </Typography>
              <Typography variant='h6' gutterBottom>
                Free
              </Typography>
              <Typography>Create up to 5 Fast-Card collections.</Typography>
              {user ? (
                <Typography
                  variant='body1'
                  color='green'
                  sx={{ mt: 2, mb: 1.8 }}
                >
                  You are using the free plan.
                </Typography>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
                  onClick={() => {
                    window.location.href = '/sign-in';
                  }}
                >
                  Choose Basic
                </Button>
              )}
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
                Unlimited Fast-Cards and storage, with priority support.
              </Typography>
              {subscription ? (
                <Typography variant='body1' color='green' sx={{ mt: 2 }}>
                  You are already subscribed to the Pro plan.
                </Typography>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
                  onClick={handleSubmit}
                >
                  {' '}
                  Choose Pro
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
      <BottomNav />
    </Container>
  );
}

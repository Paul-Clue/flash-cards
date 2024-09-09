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
// import BillingManagement from './components/BillingManagement';

export default function Home() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionUrl, setSessionUrl] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);

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
    // console.log('stripe: ', stripe.customer);
    // try {
    //   console.log(' Checking subscription for email: ', email);
    //   const customers = await stripe.customers.list({
    //     email: email,
    //     limit: 1,
    //   });

    //   if (customers.data.length === 0) {
    //     console.log('No customer found with this email.');
    //     return;
    //   }

    //   const customerId = customers.data[0].id;
    //   console.log('Customer ID: ', customerId);
    //   const subscriptions = await stripe.subscriptions.list({
    //     customer: customerId,
    //     status: 'active',
    //   });

    //   if (subscriptions.data.length > 0) {
    //     console.log('Subscription found: ', subscriptions.data[0]);
    //     setSubscription(true);
    //   } else {
    //     console.log('No active subscription found.');
    //     setSubscription(false);
    //   }
    // } catch (error) {
    //   console.error('Error checking subscription', error);
    // }

    try {
      const response = await fetch('/api/checkSubscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to check subscription');
      }

      const data = await response.json();
      return data.hasActiveSubscription;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  const handleSubscriptionCheck = async () => {
    // const userEmail = user.primaryEmailAddress.emailAddress;
    // console.log('userEmail: ', userEmail);
    // const isSubscribed = await checkSubscription(userEmail);
    // setUsrEmail(userEmail);
    // setSubscription(isSubscribed);

    setLoading(true); // Set loading to true when starting the check
    if (
      user &&
      user.primaryEmailAddress &&
      user.primaryEmailAddress.emailAddress
    ) {
      const userEmail = user.primaryEmailAddress.emailAddress;
      const isSubscribed = await checkSubscription(userEmail);
      setSubscription(isSubscribed);
    } else {
      console.log('User email is not available yet');
      setSubscription(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    handleSubscriptionCheck();
    const fetchSessionUrl = async (email) => {
      if (!email) {
        setError('Email is not available');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `/api/get-stripe-session-id?email=${encodeURIComponent(email)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch session ID');
        }
        const data = await response.json();

        setSessionId(data.sessionId);
        return data.portalUrl;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const getSessionUrl = async () => {
      const url = await fetchSessionUrl(
        user?.primaryEmailAddress?.emailAddress
      );
      console.log('url: ', url);
      setSessionUrl(url);
    };
    getSessionUrl();
  }, [user]);

  return (
    <Container
      maxWidth='xl'
      disableGutters
      sx={{
        // background:
        //   'linear-gradient(to top right, rgb(130, 290, 274), rgb(245, 245, 245), rgb(130, 290, 274), rgb(245, 245, 245) )',
        background: 'rgb(175, 238, 238)',

        height: '100%',
      }}
    >
      <Head>
        <title>Fast-Cards</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Create quick hits of knowledge on any topic or subject matter.'
        />
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
            // sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            variant='contained'
            href='/generate'
            color='primary'
            // sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
            sx={{ mt: 2 }}
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
            // sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            variant='contained'
            href='/generate'
            color='primary'
            // sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
            sx={{ mt: 2 }}
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
                // backgroundColor: 'rgb(0, 128, 128)',
                backgroundColor: 'whitesmoke',
                p: 3,
                // border: '5px solid',
                // borderColor: 'grey.300',
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
                backgroundColor: 'whitesmoke',
                p: 3,
                // border: '5px solid',
                // borderColor: 'grey.300',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant='h5' gutterBottom>
                Pro
              </Typography>
              <Typography variant='h6' gutterBottom>
                $5/Month
              </Typography>
              <Typography>
                {' '}
                Unlimited Fast-Cards and storage, with priority support.
              </Typography>
              {subscription ? (
                <>
                  <Typography
                    variant='body1'
                    color='green'
                    sx={{ mt: 2,}}
                  >
                    You are already subscribed to the Pro plan.
                  </Typography>
                  <Button
                    variant='text'
                    color='primary'
                    sx={{ mt: 2 }}
                    onClick={() => {
                      window.location.href = sessionUrl;
                    }}
                  >
                    Manage Subscription
                  </Button>
                </>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  // sx={{ mt: 2, border: '1px solid', borderColor: 'grey.300' }}
                  sx={{ mt: 2 }}
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

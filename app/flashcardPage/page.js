'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  CardActionArea,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function FlashcardPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const cards = JSON.parse(decodeURIComponent(searchParams.get('cards')));
  const [flipped, setFlipped] = useState([]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Container
        maxWidth='xl'
        disableGutters
        sx={{
          background: 'rgb(175, 238, 238)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Navbar />
        {cards.length > 0 && (
          // <Box sm={{ mt: 4 }} sx={{ marginTop: 5 }}>
          <Box
            sx={{
              width: '100%',
              padding: { xs: 2, sm: 4, md: 6 },
              marginTop: 5,
            }}
          >
            <Typography
              variant='h4'
              gutterBottom
              sx={{
                color: 'black',
                fontWeight: 'bold',
                textShadow:
                  '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
                fontWeight: 'bolder',
                textAlign: 'center',
                mb: 5,
              }}
            >
              Fast-Cards
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{ marginBottom: 5,}}
            >
              {cards.map((card, index) => {
                return (
                  <>
                    {/* <Box sx={{ mt: 4, width: '100%' }}> */}
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        elevation={0}
                        sx={{
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                          border: 'none',
                        }}
                      >
                        <CardActionArea
                          disableripple='true'
                          disabletouchripple='true'
                          disablefocusripple='true'
                          onClick={() => handleCardClick(index)}
                          sx={{
                            backgroundColor: 'transparent',
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                perspective: '1000px',
                                '& > div': {
                                  transition: 'transform 0.6s',
                                  transformStyle: 'preserve-3d',
                                  position: 'relative',
                                  width: '100%',
                                  height: '350px',
                                  // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                  transform: flipped[index]
                                    ? 'rotateY(180deg)'
                                    : 'rotateY(0deg)',
                                },
                                '& > div > div': {
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backfaceVisibility: 'hidden',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: 2,
                                  boxSizing: 'border-box',
                                },

                                '& > div > div:nth-of-type(2)': {
                                  transform: 'rotateY(180deg)',
                                },
                              }}
                            >
                              <div style={{ background: 'whitesmoke' }}>
                                <div>
                                  <Typography
                                    variant='h5'
                                    component='div'
                                    sx={{
                                      // fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      // overflowY: 'scroll',
                                      // overflowX: 'scroll',
                                      fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      overflow: 'auto',
                                      whiteSpace: 'break-spaces',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {card.front}
                                  </Typography>
                                </div>
                                <div>
                                  <Typography
                                    variant='h5'
                                    component='div'
                                    sx={{
                                      // fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      // overflowY: 'scroll',
                                      // overflowX: 'scroll',
                                      fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      overflow: 'auto',
                                      whiteSpace: 'break-spaces',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {/* {card.back} */}
                                    {card.back
                                      .match(/\((https?:\/\/[^\s)]+)\)/g)
                                      ?.map((url, index) => (
                                        <div key={index}>
                                          <a
                                            href={url.slice(1, -1)}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                          >
                                            {url.slice(1, -1)}
                                          </a>
                                          {index <
                                            card.back.match(
                                              /\((https?:\/\/[^\s)]+)\)/g
                                            ).length -
                                              1 && <br />}{' '}
                                          {/* Add line break except for the last link */}
                                        </div>
                                      ))}
                                    {card.back.replace(
                                      /\s*\(https?:\/\/[^\s)]+\)/g,
                                      ''
                                    )}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                    {/* </Box> */}
                  </>
                );
              })}
            </Grid>
          </Box>
        )}
        <Footer />
      </Container>
      <BottomNav />
    </>
  );
}

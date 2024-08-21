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
          background:
            'linear-gradient(to bottom, rgb(245, 245, 245), rgb(130, 290, 274), rgb(245, 245, 245))',
          // height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}
      >
        {cards.length > 0 && (
          <Box sm={{ mt: 4 }}>
            <Typography
              variant='h2'
              gutterBottom
              sx={{
                color: 'black',
                fontWeight: 'bold',
                textShadow:
                  '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
                fontWeight: 'bolder',
                textAlign: 'center',
              }}
            >
              Fast-Cards
            </Typography>
            <Grid container spacing={3}>
              {cards.map((card, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardActionArea
                        onClick={() => {
                          handleCardClick(index);
                        }}
                      >
                        <CardContent
                          sx={
                            {
                              // fontWeight: 'bold',
                              // background:
                              //   'linear-gradient(to bottom, rgb(245, 245, 245), rgb(245, 245, 245), rgb(128, 128, 128))',
                              // border: '1px solid turquoise',
                            }
                          }
                        >
                          <Box
                            sx={{
                              perspective: '1000px',
                              '& > div': {
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                width: '100%',
                                height: '200px',
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
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
                              overflowY: 'scroll',
                              background:
                                'linear-gradient(to bottom, rgb(245, 245, 245), rgb(245, 245, 245), rgb(128, 128, 128))',
                              border: '1px solid turquoise',
                            }}
                          >
                            <div>
                              <div>
                                <Typography
                                  variant='h5'
                                  component='div'
                                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                                >
                                  {card.front}
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  variant='h5'
                                  component='div'
                                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                                >
                                  {card.back}
                                </Typography>
                              </div>
                            </div>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
}

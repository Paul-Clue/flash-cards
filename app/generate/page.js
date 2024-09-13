'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Box,
  CardActionArea,
  DialogTitle,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import getStripe from '../../utils/getStripe';

export default function Generate() {
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [needsMoreInfo, setNeedsMoreInfo] = useState(false);
  const router = useRouter();
  const [subscription, setSubscription] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStates, setEditingStates] = useState({});

  const handleSubmit = async () => {
    setIsLoading(true);
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error == 'I need more information.') {
          alert('I need more information');
          setNeedsMoreInfo(true);
          setText('');
          return;
        }
        setFlashcards(data);
      })
      .catch((error) => {
        console.error('Failed to generate flashcards:', error);
        alert('Failed to generate flashcards');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index) => {
    setEditingIndex(null);
  };

  const handleChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index] = { ...updatedFlashcards[index], [field]: value };
    setFlashcards(updatedFlashcards);
  };

  const handleDelete = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
    setEditingStates((prev) => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  const checkSubscription = async (email) => {
    // const stripe = await getStripe();
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

  // const handleSubscriptionCheck = async () => {
  //   setLoading(true);
  //   if (
  //     user &&
  //     user.primaryEmailAddress &&
  //     user.primaryEmailAddress.emailAddress
  //   ) {
  //     const userEmail = user.primaryEmailAddress.emailAddress;
  //     const isSubscribed = await checkSubscription(userEmail);
  //     setSubscription(isSubscribed);
  //   } else {
  //     console.log('User email is not available yet');
  //     setSubscription(false);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    if (!user) {
      return;
    }

    setSubscription(checkSubscription(user.primaryEmailAddress.emailAddress));
  }, [user]);

  const saveFlashcards = async () => {
    if (!isSignedIn || !user) {
      alert('You must be signed in to save flashcards');
      return;
    }
    if (!name) {
      alert('Please enter a name');
      handleClose();
      return;
    }

    const latestUser = await user.reload();
    const userEmail = latestUser.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      console.error('User email not available');
      alert('Unable to save flashcards. Please ensure your email is verified.');
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    const collectionId = uuidv4();

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      console.log('subscription', subscription);
      if (collections.length >= 5 && !subscription) {
        alert(
          'You already have 5 collections. Upgrade to Pro Plan to save more'
        );
        return;
      }

      if (collections.find((f) => f.name === name)) {
        alert('Flashcard collection with the same name already exits');
        return;
      } else {
        collections.push({ name, id: collectionId });
        batch.set(
          userDocRef,
          {
            flashcards: collections,
            email: userEmail,
          },
          { merge: true }
        );
      }
    } else {
      batch.set(userDocRef, {
        flashcards: [{ name, id: collectionId }],
        email: userEmail,
      });
    }
    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    try {
      await batch.commit();
      console.log('Flashcards saved ', flashcards);
      handleClose();
      router.push('/flashcards');
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('Failed to save flashcards. Please try again.');
    }
  };

  const convertUrlsToLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <Box key={index} sx={{ mt: 1, mb: 1 }}>
            <a href={part} target='_blank' rel='noopener noreferrer'>
              {part}
            </a>
          </Box>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
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
        <Box
          sx={{
            flex: 1,
            mt: 4,
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '70vw',
          }}
        >
          <Typography
            variant='h4'
            sx={{
              color: 'black',
              textShadow:
                '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
              fontWeight: 'bolder',
              mb: 5,
              textAlign: 'center',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            Generate
            {<br />}
            Fast-Cards
          </Typography>
          <Typography
            variant='h4'
            sx={{
              color: 'black',
              textShadow:
                '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
              fontWeight: 'bolder',
              mb: 5,
              textAlign: 'center',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            Generate Fast-Cards
          </Typography>
          <Paper
            sx={{
              p: 4,
              width: '100%',
              boxShadow: 3,
              background:
                'linear-gradient(to bottom, rgb(245, 245, 245), rgb(245, 245, 245), rgb(128, 128, 128))',
            }}
          >
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label='enter text'
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              sx={{
                mb: 2,
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              fullWidth
              sx={{ border: '1px solid', borderColor: 'grey.300' }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Submit'}
            </Button>

            {needsMoreInfo && (
              <Typography variant='h6' color='error'>
                Please provide more information/context in the input.
              </Typography>
            )}
          </Paper>
        </Box>
        {/* Small Screen */}
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant='h5'>Fast-Cards Preview</Typography>
            <Grid
              container
              spacing={3}
              sx={{ display: { xs: 'flex', md: 'none', padding: 30 } }}
            >
              {flashcards.map((flashcard, index) => {
                return (
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
                          {editingIndex === index ? (
                            <>
                              <TextField
                                fullWidth
                                label='FRONT'
                                value={flashcard.front}
                                onChange={(e) =>
                                  handleChange(index, 'front', e.target.value)
                                }
                                margin='normal'
                                sx={{
                                  backgroundColor: 'white',
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: 'rgba(0, 0, 0, 0.23)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'primary.main',
                                      fontWeight: 'bolder',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: 'darkblue',
                                    },
                                  },
                                }}
                              />
                              <TextField
                                fullWidth
                                label='BACK'
                                value={flashcard.back}
                                onChange={(e) =>
                                  handleChange(index, 'back', e.target.value)
                                }
                                margin='normal'
                                multiline
                                rows={3}
                                sx={{
                                  backgroundColor: 'white',
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: 'rgba(0, 0, 0, 0.23)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'primary.main',
                                      fontWeight: 'bolder',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: 'darkblue',
                                    },
                                  },
                                }}
                              />
                              <IconButton onClick={() => handleSave(index)}
                                sx={{
                                  color: 'black',
                                  '&:hover': {
                                    color: 'green',
                                  },
                                }}
                                >
                                <SaveIcon/>
                              </IconButton>
                            </>
                          ) : (
                            <Box
                              sx={{
                                perspective: '1000px',
                                '& > div': {
                                  transition: 'transform 0.6s',
                                  transformStyle: 'preserve-3d',
                                  position: 'relative',
                                  width: '100%',
                                  height: '350px',
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
                                overflowY: 'auto',
                              }}
                            >
                              <div style={{ background: 'whitesmoke' }}>
                                <div className={{ backgroundColor: 'red' }}>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(index);
                                    }}
                                    color='error'
                                    sx={{
                                      // ml: 1,
                                      position: 'absolute',
                                      top: 2,
                                      right: 300,
                                      // zIndex: 1000,
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                  <Typography
                                    variant='h5'
                                    component='div'
                                    sx={{
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      overflow: 'auto',
                                      whiteSpace: 'break-spaces',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {flashcard.front}
                                  </Typography>
                                  <IconButton
                                    onClick={() => handleEdit(index)}
                                    sx={{
                                      position: 'absolute',
                                      top: 0,
                                      right: 0,
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </div>
                                <div>
                                  <Typography
                                    variant='h5'
                                    component='div'
                                    sx={{
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      overflow: 'auto',
                                      whiteSpace: 'break-spaces',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {convertUrlsToLinks(flashcard.back)}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            {/* Large Screen */}
            <Grid
              container
              spacing={3}
              sx={{ display: { xs: 'none', md: 'flex' }, padding: 5 }}
            >
              {flashcards.map((flashcard, index) => {
                return (
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
                          {editingIndex === index ? (
                            <>
                              <TextField
                                fullWidth
                                label='FRONT'
                                value={flashcard.front}
                                onChange={(e) =>
                                  handleChange(index, 'front', e.target.value)
                                }
                                margin='normal'
                                sx={{
                                  backgroundColor: 'white',
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: 'rgba(0, 0, 0, 0.23)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'primary.main',
                                      fontWeight: 'bolder',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: 'darkblue',
                                    },
                                  },
                                }}
                              />
                              <TextField
                                fullWidth
                                label='BACK'
                                value={flashcard.back}
                                onChange={(e) =>
                                  handleChange(index, 'back', e.target.value)
                                }
                                margin='normal'
                                multiline
                                rows={3}
                                sx={{
                                  backgroundColor: 'white',
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: 'rgba(0, 0, 0, 0.23)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'primary.main',
                                      fontWeight: 'bolder',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: 'darkblue',
                                    },
                                  },
                                }}
                              />
                              <IconButton onClick={() => handleSave(index)}
                                sx={{
                                  color: 'black',
                                  '&:hover': {
                                    color: 'green',
                                  },
                                }}
                                >
                                <SaveIcon />
                              </IconButton>
                            </>
                          ) : (
                            <Box
                              sx={{
                                perspective: '1000px',
                                '& > div': {
                                  transition: 'transform 0.6s',
                                  transformStyle: 'preserve-3d',
                                  position: 'relative',
                                  width: '100%',
                                  height: '350px',
                                  // height: '100%',
                                  // overflow: 'auto',
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
                                overflowY: 'auto',
                              }}
                            >
                              <div style={{ background: 'whitesmoke' }}>
                                <div className={{ backgroundColor: 'red' }}>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(index);
                                    }}
                                    color='error'
                                    sx={{
                                      // ml: 1,
                                      position: 'absolute',
                                      top: 0,
                                      right: 315,
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                  <Typography
                                    variant='h5'
                                    component='div'
                                    sx={{
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      overflow: 'auto',
                                      whiteSpace: 'break-spaces',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {flashcard.front}
                                  </Typography>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEdit(index);
                                    }}
                                    sx={{
                                      position: 'absolute',
                                      top: 0,
                                      right: 20,
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </div>
                                <div>
                                  <Typography
                                    variant='h5'
                                    component='div'
                                    sx={{
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      fontSize: '.8rem',
                                      fontWeight: 'bold',
                                      overflow: 'auto',
                                      whiteSpace: 'break-spaces',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {convertUrlsToLinks(flashcard.back)}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant='contained'
                color='secondary'
                onClick={handleOpen}
                sx={{ mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Flashcards</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcards collection
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              label='Collection Name'
              type='text'
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant='outlined'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}> Cancel</Button>
            <Button onClick={saveFlashcards}> Save</Button>
          </DialogActions>
        </Dialog>

        <Footer />
      </Container>

      <BottomNav />
    </>
  );
}

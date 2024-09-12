'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams, useSearchParams } from 'next/navigation';
import { db } from '../../../firebase';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Container,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  DialogTitle,
} from '@mui/material';
import Footer from '../../components/Footer';

export default function SharedFlashcards() {
  const { isLoading, isSignedIn, user } = useUser();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const router = useRouter();
  const [sentCard, setSentCard] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlashcards = async () => {
    if (!userId) {
      console.log('No userId provided');
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const collectionsNames = docSnap.data().flashcards || [];

      const flashcardsData = await Promise.all(
        collectionsNames.map(async (collectionData) => {
          const collectionName = collectionData.name;
          const collectionId = collectionData.id;

          const collectionRef = collection(db, 'users', userId, collectionName);

          const collectionSnap = await getDocs(collectionRef);

          const flashcardsList = collectionSnap.docs.map((doc) => doc.data());
          console.log('flashcardsList', flashcardsList);
          return {
            name: collectionName,
            cards: flashcardsList,
            id: collectionId,
          };
        })
      );

      setLoading(false);
      setFlashcards(flashcardsData);
      const foundCard = flashcardsData.find((card) => card.id === id);
      console.log('Found card:', foundCard);
      setSentCard(foundCard);
    } else {
      console.log('No user document found');
      setError('User document not found');
    }
  };

  useEffect(() => {
    if (sentCard && sentCard.name) {
      setName(sentCard.name);
    }
  }, [sentCard]);

  useEffect(() => {
    fetchFlashcards();
  }, [userId, id]);

  console.log('sentCard', sentCard.cards);

  const handleCardClick = (name, cards) => {
    router.push(
      `/flashcardPage?name=${name}&cards=${encodeURIComponent(
        JSON.stringify(cards)
      )}`
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!isSignedIn || !user) {
      alert('You must be signed in to save flashcards');
      return;
    }
    if (!name.trim()) {
      alert('Please enter a name for the collection');
      return;
    }
  
    try {
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(userDocRef);
  
      const collectionId = uuidv4();
  
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
  
        if (collections.length >= 5 && !subscription) {
          alert('You already have 5 collections. Upgrade to Pro Plan to save more');
          return;
        }
  
        if (collections.find(f => f.name === name)) {
          alert('Flashcard collection with the same name already exists');
          return;
        }
  
        collections.push({ name, id: collectionId });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      } else {
        batch.set(userDocRef, {
          flashcards: [{ name, id: collectionId }]
        });
      }
  
      const colRef = collection(userDocRef, name);
      
      if (sentCard && sentCard.cards) {
        sentCard.cards.forEach((card, index) => {
          const cardDocRef = doc(colRef);
          const cardData = {
            ...card,
            id: card.id || `card_${index + 1}`, // Ensure each card has an id
          };
          batch.set(cardDocRef, cardData);
        });
      } else {
        console.error('sentCard or sentCard.cards is undefined');
        alert('Error: No cards to save');
        return;
      }
  
      await batch.commit();
      console.log('Flashcards saved successfully');
      handleClose();
      // Optionally, redirect or update UI
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('Failed to save flashcards. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  if (sentCard.length === 0) {
    return <Typography>No flashcards found in this collection.</Typography>;
  }

  return (
    <Container
      maxWidth='xl'
      disableGutters
      sx={{
        background: 'rgb(175, 238, 238)',

        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1',
        }}
      >
        <Box marginTop={-15} marginBottom={10}>
          <Typography
            variant='h4'
            gutterBottom
            sx={{
              color: 'black',
              textShadow:
                '1px 1px 0px whitesmoke, -1px -1px 2px turquoise, 1px -1px 1px whitesmoke, -1px 1px 0px whitesmoke',
              fontWeight: 'bolder',
              textAlign: 'center',
            }}
          >
            Sent To You
          </Typography>
        </Box>
        <Box>
          <Card sx={{ width: '350px', height: '80px', display: 'flex' }}>
            <CardActionArea>
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography
                  variant='h6'
                  onClick={() => {
                    handleCardClick(sentCard.name, sentCard.cards);
                  }}
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  {sentCard.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 2,
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          {/* <TextField
            autoFocus
            defaultValue={sentCard.name}
            margin='dense'
            label='Collection Name'
            type='text'
            fullWidth
            value={sentCard.name}
            onChange={(e) => setName(e.target.value)}
            variant='outlined'
          /> */}
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {sentCard.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button
            onClick={() => {
              saveFlashcards();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </Container>
  );
}

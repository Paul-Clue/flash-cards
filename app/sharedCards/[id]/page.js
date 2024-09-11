'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { db } from '../../../firebase';
import { useRouter } from 'next/navigation';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import {
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Container,
} from '@mui/material';
import Footer from '../../components/Footer';

export default function SharedFlashcards() {
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const router = useRouter();
  const [sentCard, setSentCard] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState('');
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
          width: '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          flex: '1',
        }}
      >
        <Box marginTop={-20} marginBottom={10}>
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
            Sent To You
          </Typography>
        </Box>
        <Card sx={{ width: '100%', height: '80px', display: 'flex' }}>
          <CardActionArea>
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant='h6'
                onClick={() => {
                  handleCardClick(sentCard.name, sentCard.cards);
                }}
              >
                {sentCard.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <Footer />
    </Container>
  );
}

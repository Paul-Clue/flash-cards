'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/navigation';
import {
  CardActionArea,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import CircularProgress from '@mui/material/CircularProgress';

export default function Flashcard() {
  const { isLoading, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  const getFlashcards = async () => {
    if (!user) return;
    setLoading(true);
    const docRef = doc(db, 'users', user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const collectionsNames = docSnap.data().flashcards || [];

      const flashcardsData = await Promise.all(
        collectionsNames.map(async (collectionData) => {
          const collectionName = collectionData.name;
          const collectionId = collectionData.id;
          const collectionRef = collection(
            db,
            'users',
            user.id,
            collectionName
          );
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
    } else {
      await setDoc(docRef, { flashcards: [] });
      setLoading(false);
    }
  };
  console.log('flashcards', flashcards);
  useEffect(() => {
    getFlashcards();
  }, [user]);

  if (isLoading || !isSignedIn) {
    return <></>;
  }

  if (loading) {
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
          flex: '1',
        }}
      >
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
      </Container>
    );
  } else if (flashcards.length === 0) {
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
          flex: '1',
        }}
      >
        <Typography variant='h4' sx={{ mt: 4 }}>
          You have no flashcards yet!
        </Typography>
        <Button
          variant='contained'
          href='/generate'
          color='primary'
          sx={{ mt: 2 }}
        >
          Start making cards
        </Button>
      </Container>
    );
  }

  const handleCardClick = (name, cards) => {
    router.push(
      `/flashcardPage?name=${name}&cards=${encodeURIComponent(
        JSON.stringify(cards)
      )}`
    );
  };

  const deleteFlashcardCollection = async (collectionName) => {
    if (!isSignedIn || !user) {
      alert('You must be signed in to delete flashcards');
      return;
    }

    const userDocRef = doc(collection(db, 'users'), user.id);
    const colRef = collection(userDocRef, collectionName);

    // Delete the collection
    const batch = writeBatch(db);
    const querySnapshot = await getDocs(colRef);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(
      `Flashcard collection "${collectionName}" deleted successfully.`
    );

    // Update the user's flashcards in Firestore
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      const updatedCollections = collections.filter(
        (flashcard) => flashcard.name !== collectionName
      );

      await setDoc(
        userDocRef,
        { flashcards: updatedCollections },
        { merge: true }
      );
    }
    setFlashcards((prevFlashcards) =>
      prevFlashcards.filter((flashcard) => flashcard.name !== collectionName)
    );
  };

  const handleShare = (collectionId) => {
    const shareUrl = `${window.location.origin}/sharedCards/${collectionId}?userId=${user.id}`;
    console.log('Share URL:', shareUrl);
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Share link copied to clipboard!');
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
          flex: '1',
        }}
      >
        <Navbar />
        <Box marginTop={5}>
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
            Your Fast-Card Groups
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: 4, padding: 5, flex: '1' }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <CardActionArea>
                  <CardContent
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    <DeleteOutlinedIcon
                      onClick={() => deleteFlashcardCollection(flashcard.name)}
                      sx={{
                        color: 'red',
                        position: 'relative',
                        left: 350,
                        top: -8,
                        zIndex: 10,
                      }}
                    />
                    <Typography
                      variant='h6'
                      onClick={() => {
                        handleCardClick(flashcard.name, flashcard.cards);
                      }}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        // mt: -1,
                      }}
                    >
                      {flashcard.name}
                    </Typography>
                    <ShareIcon
                      onClick={() => handleShare(flashcard.id)}
                      sx={{
                        color: 'green',
                        position: 'relative',
                        left: 5,
                        top: -65,
                        zIndex: 10,
                      }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <CardActionArea>
                  <CardContent
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    <DeleteOutlinedIcon
                      onClick={() => deleteFlashcardCollection(flashcard.name)}
                      sx={{
                        color: 'red',
                        position: 'relative',
                        left: 255,
                        top: -8,
                        zIndex: 10,
                      }}
                    />
                    <Typography
                      variant='h6'
                      onClick={() => {
                        handleCardClick(flashcard.name, flashcard.cards);
                      }}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: -1,
                      }}
                    >
                      {flashcard.name}
                    </Typography>
                    <ShareIcon
                      onClick={() => handleShare(flashcard.id)}
                      sx={{
                        color: 'blue',
                        position: 'relative',
                        left: 255,
                        top: -8,
                        zIndex: 10,
                      }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Footer />
      </Container>
      <BottomNav />
    </>
  );
}

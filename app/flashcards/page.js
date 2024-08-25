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

export default function Flashcard() {
  const { isLoading, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  const getFlashcards = async () => {
    if (!user) return;

    const docRef = doc(db, 'users', user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const collectionsNames = docSnap.data().flashcards || [];

      const flashcardsData = await Promise.all(
        collectionsNames.map(async (collectionData) => {
          const collectionName = collectionData.name;
          const collectionRef = collection(
            db,
            'users',
            user.id,
            collectionName
          );
          const collectionSnap = await getDocs(collectionRef);

          const flashcardsList = collectionSnap.docs.map((doc) => doc.data());
          return { name: collectionName, cards: flashcardsList };
        })
      );
      console.log(flashcardsData);
      setFlashcards(flashcardsData);
    } else {
      await setDoc(docRef, { flashcards: [] });
    }
  };

  useEffect(() => {
    getFlashcards();
  }, [user]);

  if (isLoading || !isSignedIn) {
    return <></>;
  }

  if (flashcards.length === 0) {
    return (
      // <Navbar />
      <Container
        maxWidth='100vw'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          // padding: 5,
          // paddingTop: 0,
        }}
      >
        <Navbar />
        <Box marginTop={5}>
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
            Your Fast-Card Groups
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: 4, padding: 5 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea>
                  <CardContent
                    // onClick={() => {
                    //   handleCardClick(flashcard.name, flashcard.cards);
                    // }}
                    sx={{
                      fontWeight: 'bold',
                      // background:
                      //   'linear-gradient(to bottom, rgb(245, 245, 245), rgb(245, 245, 245), rgb(128, 128, 128))',
                      // border: '1px solid turquoise',
                    }}
                  >
                    {/* <Box> */}
                    <DeleteOutlinedIcon
                      // onClick={() => deleteFlashcardSet(flashcard.name)}
                      onClick={() => deleteFlashcardCollection(flashcard.name)}
                      sx={{
                        color: 'red',
                        position: 'relative',
                        left: 350,
                        top: -8,
                        zIndex: 10,
                      }}
                    />
                    {/* </Box> */}
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
                        mt: -3,
                      }}
                    >
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
      <BottomNav />
    </>
  );
}

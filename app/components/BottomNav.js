import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InputIcon from '@mui/icons-material/Input';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function BottomNav() {
  const { user } = useUser();
  const router = useRouter();
  const [value, setValue] = useState(0);

  const goToHome = () => {
    router.push('/');
  };
  const goToGenerate = () => {
    router.push('/generate');
  };
  const goToCards = () => {
    router.push('/flashcards');
  };

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) goToHome();
          else if (newValue === 1) goToGenerate();
          else if (newValue === 2) goToCards();
        }}
        sx={{
          width: '100%',
          backgroundColor: 'rgb(114, 274, 258)',
          display: { xs: 'flex', md: 'none' },
        }}
        showLabels
      >
        <BottomNavigationAction
          label='Home'
          icon={<HomeIcon sx={{ color: 'black' }} />}
        />

        {user && (
          <BottomNavigationAction
            label='Make Cards'
            icon={<InputIcon sx={{ color: 'black' }} />}
          />
        )}
        {user && (
          <BottomNavigationAction
            label='Collection'
            icon={<ViewAgendaIcon sx={{ color: 'black' }} />}
          />
        )}
      </BottomNavigation>
    </>
  );
}

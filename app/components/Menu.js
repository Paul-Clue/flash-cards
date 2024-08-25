import * as React from 'react';
import { SignedIn } from '@clerk/nextjs';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

const options = ['Home', 'Make Cards', 'Collection'];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <div>
        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={
                option === 'Home'
                  ? goToHome
                  : option === 'Make Cards'
                  ? goToGenerate
                  : option === 'Collection'
                  ? goToCards
                  : handleClose
              }
            >
              {option === 'Home' ? (
                'Home'
              ) : option === 'Make Cards' ? (
                <SignedIn>Make Cards</SignedIn>
              ) : option === 'Collection' ? (
                <SignedIn>Collection</SignedIn>
              ) : null}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
}

import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {User} from '../../types.ts';
import {useAppDispatch} from '../../app/hooks.ts';
import {logout} from '../../features/Users/usersThunks.ts';


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid>
      <Button onClick={handleClick} color={'inherit'}>Hello, {user.username}!</Button>
      <Menu open={isOpen} anchorEl={anchorEl} keepMounted onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
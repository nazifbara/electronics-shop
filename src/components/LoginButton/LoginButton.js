import { useState } from 'react';
import { Button } from '@mui/material';
import { Login } from '@mui/icons-material';

import { LoginDialog } from '../../components';

const LoginButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<Login />}
        size="medium"
        color="inherit"
      >
        login
      </Button>
      <LoginDialog onClose={handleClose} open={open} />
    </>
  );
};

export default LoginButton;

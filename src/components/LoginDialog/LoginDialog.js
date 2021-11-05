import { useState } from 'react';
import { Dialog, DialogTitle, IconButton, Tabs, Tab, Box } from '@mui/material';
import { Close } from '@mui/icons-material';

const LoginDialog = (props) => {
  const { onClose, open } = props;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (e, value) => setActiveTab(value);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <IconButton onClick={onClose} size="medium">
          <Close fontSize="medium" />
        </IconButton>
        Login
      </DialogTitle>
      <Box sx={{ maxWidth: 500, width: '90vw', height: '90vh' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;

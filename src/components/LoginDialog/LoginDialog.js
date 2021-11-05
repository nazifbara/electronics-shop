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
        <TabPanel value={0} activeTab={activeTab}>
          sign in form
        </TabPanel>
        <TabPanel value={1} activeTab={activeTab}>
          sign up form
        </TabPanel>
      </Box>
    </Dialog>
  );
};

const TabPanel = (props) => {
  const { value, activeTab, children } = props;

  return (
    <Box sx={{ width: '100%' }}>
      {value === activeTab && <Box sx={{ p: 2 }}>{children}</Box>}
    </Box>
  );
};

export default LoginDialog;

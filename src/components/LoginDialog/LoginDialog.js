import { useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  Alert,
  Dialog,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const LoginDialog = (props) => {
  const { onClose, open } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [confirmMode, setConfirmMode] = useState(false);
  const [forms, setForms] = useState(INITIAL_FORMS_STATE);

  const handleTabChange = (e, value) => setActiveTab(value);
  const signUp = async (e) => {
    const { email, password, name } = forms.signUp;
    try {
      await Auth.signUp({
        password,
        username: email,
        attributes: { name },
      });
      console.log('sign up success!');
      setConfirmMode(true);
    } catch (error) {
      console.error('error signing up...', error);
    }
  };
  async function confirmSignUp() {
    const {
      signUp: { email },
      confirmation: { code },
    } = forms;

    try {
      await Auth.confirmSignUp(email, code);
      setActiveTab(0);
    } catch (err) {
      console.error('error signing up..', err);
    }
  }
  const updateFormState = (type) => (e) => {
    const {
      target: { name, value },
    } = e;
    setForms((s) => ({ ...s, [type]: { ...s[type], [name]: value } }));
  };

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
          <SignUpForm
            updateFormState={updateFormState('signUp')}
            updateCode={updateFormState('confirmation')}
            confirmMode={confirmMode}
            fieldsValues={{ ...forms.signUp, ...forms.confirmation }}
            signUp={signUp}
            confirmSignUp={confirmSignUp}
          />
        </TabPanel>
      </Box>
    </Dialog>
  );
};

const INITIAL_FORMS_STATE = {
  signUp: {
    name: '',
    email: '',
    password: '',
  },
  confirmation: {
    code: '',
  },
};

const SignUpForm = (props) => {
  const {
    updateFormState,
    updateCode,
    signUp,
    confirmSignUp,
    confirmMode,
    fieldsValues: { name, email, password, code },
  } = props;

  return (
    <>
      {!confirmMode && (
        <form>
          <TextField
            fullWidth
            value={name}
            onChange={updateFormState}
            name="name"
            label="Full Name"
            margin="normal"
          />
          <TextField
            fullWidth
            value={email}
            onChange={updateFormState}
            name="email"
            type="email"
            label="E-mail"
            margin="normal"
          />
          <TextField
            fullWidth
            value={password}
            onChange={updateFormState}
            name="password"
            type="password"
            label="Password"
            margin="normal"
          />
          <Button onClick={signUp} variant="contained" size="medium">
            sign up
          </Button>
        </form>
      )}

      {confirmMode && (
        <form>
          <Alert severity="info">
            Please check your e-mail. We've sent you a confirmation code.
          </Alert>

          <TextField
            fullWidth
            value={code}
            onChange={updateCode}
            name="code"
            label="Confirmation Code"
            margin="normal"
          />
          <Button onClick={confirmSignUp} variant="contained" size="medium">
            Confirm
          </Button>
        </form>
      )}
    </>
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

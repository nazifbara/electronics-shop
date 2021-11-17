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
  Link,
} from '@mui/material';
import { Close, ArrowBack } from '@mui/icons-material';

const LoginDialog = (props) => {
  const { onClose, open } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [confirmMode, setConfirmMode] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(null);
  const [forms, setForms] = useState(INITIAL_FORMS_STATE);

  const handleTabChange = (e, value) => setActiveTab(value);
  const forgotPassword = async () => {
    const { email } = forms.signIn;

    try {
      await Auth.forgotPassword(email);
      console.info('forgotPassword success');
      setRecoveryMode('confirm');
    } catch (error) {
      console.error(error);
    }
  };
  const forgotPasswordSubmit = async () => {
    const { email } = forms.signIn;
    const { code, newPassword } = forms.recovery;
    const validationError = validate({ password: newPassword, code });

    if (validationError) {
      console.log(validationError);
      setForms((s) => ({ ...s, recovery: { ...s.recovery, validationError } }));
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      console.info('forgotPasswordSubmit success');
      setRecoveryMode(null);
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async (e) => {
    const { email, password } = forms.signIn;
    try {
      const user = await Auth.signIn(email, password);
      const userInfo = { email: user.username, ...user.attributes };
      console.info('Sign-in success: ', userInfo);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const signUp = async (e) => {
    const { email, password, name } = forms.signUp;
    const validationError = validate(forms.signUp);

    if (validationError) {
      setForms((s) => ({ ...s, signUp: { ...s.signUp, validationError } }));
      return;
    }

    try {
      await Auth.signUp({
        password,
        username: email,
        attributes: { name },
      });
      console.info('sign up success!');
      setConfirmMode(true);
    } catch (error) {
      console.error('error signing up...', error.name);
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
      setConfirmMode(false);
      setForms((s) => ({
        ...s,
        signUp: { ...INITIAL_FORMS_STATE.signUp },
        confirmation: { ...INITIAL_FORMS_STATE.confirmation },
      }));
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
          <SignInForm
            updateFormState={updateFormState('signIn')}
            updateRecovery={updateFormState('recovery')}
            recoveryMode={recoveryMode}
            setRecoveryMode={setRecoveryMode}
            validationError={forms.recovery.validationError}
            fieldsValues={{ ...forms.signIn, ...forms.recovery }}
            signIn={signIn}
            forgotPassword={forgotPassword}
            forgotPasswordSubmit={forgotPasswordSubmit}
          />
        </TabPanel>
        <TabPanel value={1} activeTab={activeTab}>
          <SignUpForm
            updateFormState={updateFormState('signUp')}
            updateCode={updateFormState('confirmation')}
            confirmMode={confirmMode}
            validationError={forms.signUp.validationError}
            fieldsValues={{ ...forms.signUp, ...forms.confirmation }}
            signUp={signUp}
            confirmSignUp={confirmSignUp}
          />
        </TabPanel>
      </Box>
    </Dialog>
  );
};

const validate = (data) => {
  const keys = Object.keys(data);
  const error = {};

  keys.forEach((key) => {
    switch (key) {
      case 'code':
        if (isNaN(Number(data[key])) || data[key].length !== 6) {
          error[key] = 'confirmation must be a 6-digit number';
        }
        break;
      case 'email':
        const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!data[key].match(mailFormat)) {
          error[key] = 'invalid email address';
        }
        break;
      case 'name':
        if (data[key].length < 3) {
          error[key] = 'name must contain at least 3 characters';
        }
        break;
      case 'password':
        if (data[key].length < 8) {
          error[key] = 'password must be at least 8 characters long';
        }
        break;
      default:
        break;
    }
  });

  return Object.keys(error).length === 0 ? null : error;
};

const INITIAL_FORMS_STATE = {
  signIn: {
    email: '',
    password: '',
  },
  signUp: {
    name: '',
    email: '',
    password: '',
    validationError: null,
  },
  confirmation: {
    code: '',
  },
  recovery: {
    code: '',
    newPassword: '',
    validationError: null,
  },
};

const SignInForm = (props) => {
  const {
    updateFormState,
    updateRecovery,
    signIn,
    forgotPassword,
    forgotPasswordSubmit,
    recoveryMode,
    setRecoveryMode,
    validationError,
    fieldsValues: { email, password, code, newPassword },
  } = props;

  return (
    <>
      {!recoveryMode && (
        <form>
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
          <Button
            sx={{ mb: 3 }}
            onClick={signIn}
            variant="contained"
            size="medium"
          >
            sign in
          </Button>
          <div>
            <Link onClick={() => setRecoveryMode('forgot')} href="#">
              Forgot password?
            </Link>
          </div>
        </form>
      )}

      {recoveryMode && (
        <form>
          <TextField
            fullWidth
            value={email}
            disabled={recoveryMode === 'confirm'}
            onChange={updateFormState}
            name="email"
            label="E-mail"
            type="email"
            margin="normal"
          />
          {recoveryMode === 'confirm' && (
            <>
              <TextField
                fullWidth
                error={validationError && Boolean(validationError.code)}
                helperText={validationError && validationError.code}
                value={code}
                onChange={updateRecovery}
                name="code"
                label="Confirmation Code"
                margin="normal"
              />
              <TextField
                fullWidth
                error={validationError && Boolean(validationError.password)}
                helperText={validationError && validationError.password}
                value={newPassword}
                onChange={updateRecovery}
                name="newPassword"
                type="password"
                label="New Password"
                margin="normal"
              />
            </>
          )}
          {recoveryMode === 'forgot' && (
            <Button
              sx={{ mb: 3 }}
              onClick={forgotPassword}
              variant="contained"
              size="medium"
            >
              reset password
            </Button>
          )}

          {recoveryMode === 'confirm' && (
            <Button
              sx={{ mb: 3 }}
              onClick={forgotPasswordSubmit}
              variant="contained"
              size="medium"
            >
              confirm new password
            </Button>
          )}
          <div>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => setRecoveryMode(null)}
            >
              go back
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

const SignUpForm = (props) => {
  const {
    updateFormState,
    updateCode,
    signUp,
    confirmSignUp,
    confirmMode,
    validationError,
    fieldsValues: { name, email, password, code },
  } = props;

  return (
    <>
      {!confirmMode && (
        <form>
          <TextField
            fullWidth
            error={validationError && Boolean(validationError.name)}
            helperText={validationError && validationError.name}
            value={name}
            onChange={updateFormState}
            name="name"
            label="Full Name"
            margin="normal"
          />
          <TextField
            fullWidth
            error={validationError && Boolean(validationError.email)}
            helperText={validationError && validationError.email}
            value={email}
            onChange={updateFormState}
            name="email"
            type="email"
            label="E-mail"
            margin="normal"
          />
          <TextField
            fullWidth
            error={validationError && Boolean(validationError.password)}
            helperText={validationError && validationError.password}
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

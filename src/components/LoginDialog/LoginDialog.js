import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const LoginDialog = (props) => {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <IconButton onClick={onClose} size="medium">
          <Close fontSize="medium" />
        </IconButton>
        Login
      </DialogTitle>
    </Dialog>
  );
};

export default LoginDialog;

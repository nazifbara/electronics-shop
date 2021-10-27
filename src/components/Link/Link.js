import { Link as LinkRD } from 'react-router-dom';
import { Link as LinkMUI } from '@mui/material';

const Link = ({ component = LinkRD, ...otherProps }) => (
  <LinkMUI component={LinkRD} {...otherProps} />
);

export default Link;

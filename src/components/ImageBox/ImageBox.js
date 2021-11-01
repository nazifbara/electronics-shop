import { styled } from '@mui/system';
import { Box } from '@mui/material';

const ImageBox = styled(Box)`
  width: 100%;
  position: relative;

  img {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    max-height: 100%;
  }
`;

export default ImageBox;

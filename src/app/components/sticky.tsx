import { Box } from '@chakra-ui/react';
import { CSSProperties } from 'react';

const STICKY_SX: CSSProperties = {
  background: 'white',
  position: 'sticky',
  top: 0,
};

interface StickyProps {
  children: React.ReactNode;
}

export const Sticky: React.FC<StickyProps> = ({ children }) => {
  return <Box sx={STICKY_SX}>{children}</Box>;
};

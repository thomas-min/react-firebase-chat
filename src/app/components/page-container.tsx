import { Box, Container } from '@chakra-ui/react';

interface PageProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageProps> = ({ children }) => {
  return (
    <Box
      w='100vw'
      bg='gray.100'
      overflowY='scroll'
      height={'calc(var(--vh, 1vh) * 100)'}
    >
      <Container p={0} h='full' maxW='container.sm' bg='white'>
        {children}
      </Container>
    </Box>
  );
};

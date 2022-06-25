import { Text } from '@chakra-ui/react';

interface TitleProps {
  value: string;
}

export const Title: React.FC<TitleProps> = ({ value }) => {
  return (
    <Text fontSize='6xl' color='gray.700'>
      {value}
    </Text>
  );
};

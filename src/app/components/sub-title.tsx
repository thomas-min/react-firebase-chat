import { Text } from '@chakra-ui/react';

interface SubTitleProps {
  value: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({ value }) => {
  return (
    <Text fontSize='2xl' color='gray.700'>
      {value}
    </Text>
  );
};

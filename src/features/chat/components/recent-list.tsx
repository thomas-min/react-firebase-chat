import { Box, Flex, Image, Text } from '@chakra-ui/react';

interface RecentItemProps {
  imgSrc: string;
  name: string;
  message: string;
  date: Date;
}

const RecentItem: React.FC<RecentItemProps> = ({ imgSrc, name, message, date }) => {
  return (
    <Flex w='full' my={6}>
      <Image borderRadius={100} src={imgSrc} alt={imgSrc} boxSize={12} mx='auto' mr={4} />
      <Box flexGrow={1}>
        <Flex>
          <Text flexGrow={1} color='teal' fontWeight={600}>
            {name}
          </Text>
          <Text>{date.getHours() + ':' + date.getMinutes()}</Text>
        </Flex>
        <Text>{message}</Text>
      </Box>
    </Flex>
  );
};

export const RecentList = () => {
  return (
    <Box w='full' overflow='hidden'>
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
      <RecentItem
        imgSrc='https://bit.ly/dan-abramov'
        name='Dan Abramov'
        message='hello world!'
        date={new Date()}
      />
    </Box>
  );
};

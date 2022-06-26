import { Button, Flex, Input } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

export const MessageForm = () => {
  const [formValue, setFormValue] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement create message

    setFormValue('');
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue(e.target.value);
    },
    [],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Flex bg='gray.100' py='4' px='2'>
        <Input
          bg='white'
          m='1'
          type='string'
          value={formValue}
          onChange={handleInputChange}
          placeholder='Type your message...'
        />
        <Button m='1' colorScheme='teal' type='submit'>
          send
        </Button>
      </Flex>
    </form>
  );
};

import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const UserSearchForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <Box my={4}>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input placeholder='Search user by email' value={inputValue} onChange={handleChange} />
          <InputRightElement children={<FaSearch />} />
        </InputGroup>
      </form>
    </Box>
  );
};

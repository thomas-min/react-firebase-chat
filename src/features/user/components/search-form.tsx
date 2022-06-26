import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useUserQuery } from '../hooks/useUserQuery';
import { searchResultState } from '../atoms/search-result-state';
import { useSetRecoilState } from 'recoil';

export const UserSearchForm = () => {
  const { getUsers } = useUserQuery();
  const [inputValue, setInputValue] = useState('');
  const setSearchResult = useSetRecoilState(searchResultState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const users = await getUsers(inputValue);
      setSearchResult(users);
      setInputValue('');
    },
    [getUsers, inputValue, setSearchResult],
  );

  return (
    <Box my={4}>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            placeholder='Search user by email'
            value={inputValue}
            onChange={handleChange}
          />
          <InputRightElement children={<FaSearch />} />
        </InputGroup>
      </form>
    </Box>
  );
};

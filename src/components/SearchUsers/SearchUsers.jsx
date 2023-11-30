import { Flex, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from 'prop-types';

export const SearchUsers = ({onSearch, onSort}) => {
    const [searchCriteria, setSearchCriteria] = useState(''); // ['author', 'title', 'content'
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        if(searchCriteria === '') {
            return;
        }
        onSearch(e.target.value, searchCriteria);
    }
    const handleSearchCriteria = (e) => {
        setSearchCriteria(e.target.value);
        if (searchValue !== '') {
            onSearch(searchValue, e.target.value);
        }
    }
    const handleSort = (e) => {
        onSort(e.target.value, searchCriteria);
    }
    return (
        <Flex p={4} bg="gray.100" align="center" justify="center">
        <Input color="blue.500" placeholder="Search by keyword, username, etc." onChange={handleSearch} bg="white" borderRadius="md" boxShadow="base" />
        <Select color="blue.500" placeholder="Select criteria" onChange={handleSearchCriteria} ml={2} bg="white" borderRadius="md" boxShadow="base">
            <option value="firstName">First name</option>
            <option value="lastName">Last name</option>
            <option value="email">Email</option>
            <option value="username">Username</option>
        </Select>
        <Select color="blue.500" placeholder="Sort by alphabetical order" onChange={handleSort} ml={2} bg="white" borderRadius="md" boxShadow="base">
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </Select>
      </Flex>
    )
}

SearchUsers.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
  };
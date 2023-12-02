import { useEffect, useState } from "react";
import {
  VStack,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  getAllUsers,
  banUser,
  unBanUser,
  setToAdmin,
  unSetToAdmin,
} from "../../services/user.services";
import { SearchUsers } from "../../components/SearchUsers/SearchUsers";

export const AdminView = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const filterUsers = (users, filter, searchType) => {
    if (searchType !== "" && filter !== "") {
      if (searchType === "firstName") {
        return users.filter((user) =>
          user.firstName.toLowerCase().includes(filter.toLowerCase())
        );
      } else if (searchType === "lastName") {
        return users.filter((user) =>
          user.lastName.toLowerCase().includes(filter.toLowerCase())
        );
      } else if (searchType === "email") {
        return users.filter((user) =>
          user.email.toLowerCase().includes(filter.toLowerCase())
        );
      } else if (searchType === "username") {
        return users.filter((user) =>
          user.username.toLowerCase().includes(filter.toLowerCase())
        );
      }
    } else {
      return users;
    }
  };

  const handleSearch = (filter, searchType) => {
    if (searchType !== "" && filter) {
      setFilteredUsers(filterUsers(users, filter, searchType));
    } else {
      setFilteredUsers(filteredUsers);
    }
  };

  const handleSort = (sort, searchType) => {
    if (sort !== "" && searchType !== "") {
      if (sort === "az") {
        setFilteredUsers(
          [...filteredUsers].sort((a, b) =>
            a[searchType].localeCompare(b[searchType])
          )
        );
      } else {
        setFilteredUsers(
          [...filteredUsers].sort((a, b) =>
            b[searchType].localeCompare(a[searchType])
          )
        );
      }
    } else {
      setFilteredUsers(filteredUsers);
    }
  };

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res);
      setFilteredUsers(res);
    });
  }, []);

  const handleMakeAdmin = async (id, isAdmin) => {
    if (isAdmin) {
      await unSetToAdmin(id);
      const newUsers = users.map((user) => {
        if (user.id === id) {
          user.isAdmin = false;
        }
        return user;
      });
      setUsers(newUsers);
      setFilteredUsers(newUsers);
      toast({
        title: "Admin removed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      await setToAdmin(id);
      const newUsers = users.map((user) => {
        if (user.id === id) {
          user.isAdmin = true;
        }
        return user;
      });
      setUsers(newUsers);
      setFilteredUsers(newUsers);
      toast({
        title: "Admin set successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBan = async (id, isBanned) => {
    let newUsers = [];
    if (isBanned) {
      await unBanUser(id);
      newUsers = users.map((user) => {
        if (user.id === id) {
          user.isBanned = false;
        }
        return user;
      });
      toast({
        title: "Ban removed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      await banUser(id);
      newUsers = users.map((user) => {
        if (user.id === id) {
          user.isBanned = true;
        }
        return user;
      });
      toast({
        title: "Ban set successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        });
    }
    setUsers(newUsers);
    setFilteredUsers(newUsers);
  };

  const handleBanAdmin = () => {
    toast({
      title: "You can't ban an admin.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch" m={4}>
      <SearchUsers onSearch={handleSearch} onSort={handleSort} />
      <Box height="640px" overflowY="scroll">
        <Table variant="simple">
          <Thead position="sticky" top="0" bg="brand.navy" zIndex="1">
            <Tr>
              <Th color="brand.green">First Name</Th>
              <Th color="brand.green">Last Name</Th>
              <Th color="brand.green">Email</Th>
              <Th color="brand.green">Username</Th>
              <Th color="brand.green">Role</Th>
              <Th color="brand.green">Is Admin</Th>
              <Th color="brand.green">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers &&
              filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.role}</Td>
                  <Td color="brand.green">{user.isAdmin && "Admin"}</Td>
                  <Td>
                    <Flex direction="row">
                      <Button
                        m={2}
                        colorScheme="green"
                        onClick={() => handleMakeAdmin(user.id, user.isAdmin)}
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </Button>
                      <Button
                        m={2}
                        colorScheme={user.isBanned ? "green" : "red"}
                        onClick={() =>
                          user.isAdmin
                            ? handleBanAdmin()
                            : handleBan(user.id, user.isBanned || false)
                        }
                      >
                        {user.isBanned ? "Remove Ban" : "Ban user"}
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

import React, { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import UserModal from "./UserModal"; // Import the modal component

// Mock User Data
const usersData = [
  {
    id: "1",
    username: "John Doe",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    username: "Jane Smith",
    phoneNumber: "+9876543210",
    email: "jane.smith@example.com",
    role: "Employee",
    status: "Inactive",
  },
];

const UsersPage = () => {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    status: "",
    role: "",
  });

  const resetFilters = () => {
    setFilters({ status: "", role: "" });
    setFilteredUsers(users);
  };

  const handleAddUser = () => {
    setUsers([
      ...users,
      {
        ...selectedUser,
        id: String(users.length + 1),
      },
    ]);
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleEditUser = () => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...selectedUser } : user
      )
    );
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleAction = (action: string, user: any) => {
    setSelectedUser(user);
    if (action === "Edit") {
      setModalMode("edit");
      setIsModalOpen(true);
    } else if (action === "View") {
      setModalMode("view");
      setIsModalOpen(true);
    }
  };

  return (
    <Box padding="6" width="98%">
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Heading size="md" textAlign="left">
          Users
        </Heading>
        <Button
          bg={"rgba(156, 216, 210, 1)"}
          _hover={{
            bg: "rgba(156, 216, 210, 0.6)",
          }}
          color="black"
          fontSize={"14px"}
          onClick={() => {
            setModalMode("add");
            setSelectedUser({
              username: "",
              phoneNumber: "",
              email: "",
              role: "",
              status: "Active",
            });
            setIsModalOpen(true);
          }}
        >
          Add User
        </Button>
      </Flex>

      <Flex mb="6" gap="4" flexWrap="wrap">
        <Select
          placeholder="Status"
          width="200px"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Select>
        <Select
          placeholder="Role"
          width="200px"
          value={filters.role}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, role: e.target.value }))
          }
        >
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </Select>
        <Button colorScheme="gray" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Flex>

      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>{user.phoneNumber}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.status}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<FiMoreVertical />}
                      variant="outline"
                      border="0"
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleAction("Edit", user)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleAction("View", user)}>
                        View Details
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        setUser={setSelectedUser}
        mode={modalMode}
        onSave={modalMode === "add" ? handleAddUser : handleEditUser}
      />
    </Box>
  );
};

export default UsersPage;

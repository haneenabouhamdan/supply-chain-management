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
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import CustomerModal from "./CustomerModal";
import { useGetCustomersQuery } from "../../../resolvers";

const CustomersPage = () => {
  const { customers, loading, error } = useGetCustomersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Handle opening the modal for add, edit, or view modes
  const handleOpenModal = (
    mode: "add" | "edit" | "view",
    customer: any = null
  ) => {
    setModalMode(mode);
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Handle saving the customer (add/edit)
  const handleSave = () => {
    if (modalMode === "add" && selectedCustomer) {
      // Add the new customer to the list
      const newCustomer = {
        ...selectedCustomer,
        id: String(customers.length + 1),
      };
      customers.push(newCustomer); // Add the new customer to the local state (simulating API call success)
    } else if (modalMode === "edit" && selectedCustomer) {
      // Edit the selected customer
      const updatedCustomers = customers.map((customer: any) =>
        customer.id === selectedCustomer.id ? selectedCustomer : customer
      );
      // Update the customers list with the edited customer
      customers.splice(0, customers.length, ...updatedCustomers);
    }
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="xl" />
        <Text mt="4">Loading customers...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="10">
        <Text color="red.500">Error fetching customers: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box padding="6" width="98%">
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Heading size="md" textAlign="left">
          Customers
        </Heading>
        <Button
          bg={"rgba(156, 216, 210, 1)"}
          _hover={{
            bg: "rgba(156, 216, 210, 0.6)",
          }}
          color="black"
          fontSize={"14px"}
          onClick={() =>
            handleOpenModal("add", {
              name: "",
              phone: "",
              email: "",
              address: "",
            })
          }
        >
          Add Customer
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
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((customer) => (
              <Tr key={customer.id}>
                <Td>{customer.name}</Td>
                <Td>{customer.phone}</Td>
                <Td>{customer.email}</Td>
                <Td>{customer.address}</Td>
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
                      <MenuItem
                        onClick={() => handleOpenModal("edit", customer)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleOpenModal("view", customer)}
                      >
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

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        setCustomer={setSelectedCustomer}
        mode={modalMode}
        onSave={handleSave}
      />
    </Box>
  );
};

export default CustomersPage;

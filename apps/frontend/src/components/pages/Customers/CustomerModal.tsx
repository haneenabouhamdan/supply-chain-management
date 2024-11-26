import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} from "../../../resolvers";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  mode: "add" | "edit" | "view";
  onSave: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
  setCustomer,
  mode,
  onSave,
}) => {
  const toast = useToast();
  const { createCustomer, loading: creating } = useCreateCustomerMutation();
  const { updateCustomer, loading: updating } = useUpdateCustomerMutation();
  const isViewMode = mode === "view";

  const handleChange = (field: keyof Customer, value: string) => {
    if (customer) {
      setCustomer({
        ...customer,
        [field]: value,
      });
    }
  };

  const handleSave = async () => {
    if (mode === "add" && customer) {
      // Add a new customer
      await createCustomer({
        payload: customer,
        onCompleted: () => {
          toast({
            title: "Customer Added",
            description: "The customer has been successfully added.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        },
      });
    } else if (mode === "edit" && customer && customer.id) {
      // Update an existing customer
      await updateCustomer({
        payload: {
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
        },
        onCompleted: () => {
          toast({
            title: "Customer Updated",
            description: "The customer details have been successfully updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        },
      });
    } else {
      onSave();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" maxW="700px">
        <ModalHeader>
          {mode === "add" && "Add Customer"}
          {mode === "edit" && "Edit Customer"}
          {mode === "view" && "View Customer"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isDisabled={isViewMode} mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Customer Name"
              value={customer?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormControl>
          <FormControl isDisabled={isViewMode} mb="4">
            <FormLabel>Phone</FormLabel>
            <Input
              placeholder="Phone Number"
              value={customer?.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </FormControl>
          <FormControl isDisabled={isViewMode} mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email Address"
              value={customer?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </FormControl>
          <FormControl isDisabled={isViewMode} mb="4">
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="Address"
              value={customer?.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {!isViewMode && (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSave}
              isLoading={creating || updating}
            >
              Save
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            {isViewMode ? "Close" : "Cancel"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerModal;

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
  Select,
  Box,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  setUser: (user: any) => void;
  mode: "add" | "edit" | "view";
  onSave?: () => void;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
  mode,
  onSave,
}) => {
  const isViewMode = mode === "view";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" maxW="700px">
        <ModalHeader>
          {mode === "add"
            ? "Add New User"
            : mode === "edit"
              ? "Edit User"
              : "User Details"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="4">
          {isViewMode ? (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="10"
              bg="gray.50"
              boxShadow="sm"
            >
              <Box mb="4">
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Username:
                  </Text>
                  <Text>{user?.username}</Text>
                </Flex>
              </Box>

              <Box mb="4">
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Phone Number:
                  </Text>
                  <Text>{user?.phoneNumber}</Text>
                </Flex>
              </Box>

              <Box mb="4">
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Email:
                  </Text>
                  <Text>{user?.email}</Text>
                </Flex>
              </Box>

              <Box mb="4">
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Role:
                  </Text>
                  <Text>{user?.role}</Text>
                </Flex>
              </Box>

              <Box>
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Status:
                  </Text>
                  <Text>{user?.status}</Text>
                </Flex>
              </Box>
            </Box>
          ) : (
            <Box mb="4">
              <Input
                placeholder="Username"
                value={user?.username || ""}
                onChange={(e) =>
                  setUser((prev: any) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                mb="4"
              />
              <Input
                placeholder="Phone Number"
                value={user?.phoneNumber || ""}
                onChange={(e) =>
                  setUser((prev: any) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                mb="4"
              />
              <Input
                placeholder="Email"
                value={user?.email || ""}
                onChange={(e) =>
                  setUser((prev: any) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                mb="4"
              />
              <Input
                placeholder="Role"
                value={user?.role || ""}
                onChange={(e) =>
                  setUser((prev: any) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                mb="4"
              />
              <Select
                value={user?.status || "Active"}
                onChange={(e) =>
                  setUser((prev: any) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </Box>
          )}
        </ModalBody>
        {!isViewMode && (
          <ModalFooter>
            <Button
              bg={"rgba(156, 216, 210, 1)"}
              _hover={{
                bg: "rgba(156, 216, 210, 0.6)",
              }}
              color="black"
              fontSize={"14px"}
              mr="3"
              onClick={onSave}
            >
              {mode === "add" ? "Add User" : "Save Changes"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserModal;

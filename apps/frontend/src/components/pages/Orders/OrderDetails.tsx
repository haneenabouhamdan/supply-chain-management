import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: any;
  handleEditQuantity: (productId: string, newQuantity: number) => void;
  handleDeleteItem: (productId: string) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedOrder,
  handleEditQuantity,
  handleDeleteItem,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" maxW="700px">
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Items</Tab>
              <Tab>Supplier</Tab>
            </TabList>
            <TabPanels>
              {/* Order Items Tab */}
              <TabPanel>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>SKU</Th>
                      <Th>Quantity</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedOrder?.items.map((item: any) => (
                      <Tr key={item.product_id} fontSize={"14px"}>
                        <Td>{item.product_name}</Td>
                        <Td>{item.sku}</Td>
                        <Td>
                          <Input
                            type="number"
                            value={item.quantity}
                            width={"50px"}
                            onChange={(e) =>
                              handleEditQuantity(
                                item.product_id,
                                Number(e.target.value)
                              )
                            }
                          />
                        </Td>
                        <Td>
                          <IconButton
                            size="lg"
                            color="rgba(255, 99, 132, 1)"
                            aria-label="Delete Item"
                            icon={<MdDelete />}
                            onClick={() => handleDeleteItem(item.product_id)}
                            variant={"text"}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>

              {/* Supplier Tab */}
              <TabPanel>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr fontSize={"14px"}>
                      <Td>{selectedOrder?.supplier_id}</Td>
                      <Td>Example Supplier Details</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" fontSize={"14px"} mr="3" onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailsModal;

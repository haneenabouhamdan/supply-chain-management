import React, { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useUpdateOrderMutation } from "../../../resolvers";

// Define the type for an Order Item
interface OrderItem {
  productId: string;
  quantity: number;
  product?: {
    name: string;
    sku: string;
  };
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: {
    id: string;
    items: OrderItem[];
  };
  supplierDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedOrder,
  supplierDetails,
}) => {
  const toast = useToast();
  const { updateOrder, updating } = useUpdateOrderMutation();

  // Local state for order items
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    selectedOrder?.items || []
  );

  // Sync orderItems with selectedOrder whenever selectedOrder changes
  useEffect(() => {
    if (selectedOrder?.items) {
      setOrderItems(selectedOrder.items);
    }
  }, [selectedOrder]);

  // Handle quantity changes
  const handleEditQuantity = (productId: string, newQuantity: number) => {
    setOrderItems((prevItems: OrderItem[]) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle deleting an item
  const handleDeleteItem = (productId: string) => {
    setOrderItems((prevItems: OrderItem[]) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  // Submit updated order
  const handleSaveOrder = async () => {
    try {
      await updateOrder(selectedOrder.id, {
        items: orderItems.map((data) => ({
          productId: data.productId,
          orderId: selectedOrder.id,
          quantity: data.quantity,
        })),
      });

      toast({
        title: "Order Updated",
        description: "The order has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to update order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
                    {orderItems.map((item) => (
                      <Tr key={item.productId} fontSize={"14px"}>
                        <Td>{item.product?.name}</Td>
                        <Td>{item.product?.sku}</Td>
                        <Td>
                          <Input
                            type="number"
                            value={item.quantity}
                            width={"70px"}
                            onChange={(e) =>
                              handleEditQuantity(
                                item.productId,
                                Number(e.target.value)
                              )
                            }
                          />
                        </Td>
                        <Td>
                          <IconButton
                            size="sm"
                            color="red.500"
                            aria-label="Delete Item"
                            icon={<MdDelete />}
                            onClick={() => handleDeleteItem(item.productId)}
                            variant={"ghost"}
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
                      <Th>Field</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Name</Td>
                      <Td>{supplierDetails?.name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email</Td>
                      <Td>{supplierDetails?.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>Phone</Td>
                      <Td>{supplierDetails?.phone}</Td>
                    </Tr>
                    <Tr>
                      <Td>Address</Td>
                      <Td>{supplierDetails?.address}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            fontSize={"14px"}
            mr="3"
            onClick={handleSaveOrder}
            isLoading={updating}
          >
            Save
          </Button>
          <Button colorScheme="gray" fontSize={"14px"} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailsModal;

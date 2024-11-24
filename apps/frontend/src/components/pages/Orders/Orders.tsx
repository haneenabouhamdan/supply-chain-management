import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import OrderDetailsModal from "./OrderDetails";

// Mock Order and Order Items Data
const ordersData = [
  {
    id: "1",
    reference: "48t8",
    customer_id: "Customer A",
    status: "Pending",
    payment_type: "Card",
    payment_amount: 100.0,
    supplier_id: "Supplier A",
    estimated_delivery_date: "2024-11-25",
    actual_delivery_date: "2024-11-26",
    shipment_id: "Shipment A",
    items: [
      {
        product_id: "p1",
        product_name: "Product A",
        sku: "IUEDBDEK",
        quantity: 2,
      },
      {
        product_id: "p2",
        product_name: "Product B",
        sku: "JKHDWIOIH",
        quantity: 1,
      },
    ],
  },
  {
    id: "2",
    reference: "48tvjv8",
    customer_id: "Customer B",
    status: "Shipped",
    payment_type: "Cash",
    payment_amount: 200.0,
    supplier_id: "Supplier B",
    estimated_delivery_date: "2024-11-27",
    actual_delivery_date: "2024-11-28",
    shipment_id: "Shipment B",
    items: [
      {
        product_id: "p3",
        product_name: "Product C",
        quantity: 4,
      },
      {
        product_id: "p4",
        product_name: "Product D",
        quantity: 2,
      },
    ],
  },
];

const OrdersPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders, setOrders] = useState(ordersData);
  const [filteredOrders, setFilteredOrders] = useState(ordersData);
  const [filter, setFilter] = useState({
    status: "",
    supplier: "",
    paymentType: "",
  });

  // Handle Filters
  useEffect(() => {
    let filtered = [...orders];

    if (filter.status) {
      filtered = filtered.filter((order) => order.status === filter.status);
    }

    if (filter.supplier) {
      filtered = filtered.filter(
        (order) => order.supplier_id === filter.supplier
      );
    }

    if (filter.paymentType) {
      filtered = filtered.filter(
        (order) => order.payment_type === filter.paymentType
      );
    }

    setFilteredOrders(filtered);
  }, [filter, orders]);

  const resetFilters = () => {
    setFilter({
      status: "",
      supplier: "",
      paymentType: "",
    });
    setFilteredOrders(orders);
  };

  const handleViewDetails = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    onOpen();
  };

  const handleEditQuantity = (productId: string, newQuantity: number) => {
    if (!selectedOrder) return;

    const updatedItems = selectedOrder.items.map((item: any) =>
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    );

    setSelectedOrder({ ...selectedOrder, items: updatedItems });
  };

  const handleDeleteItem = (productId: string) => {
    if (!selectedOrder) return;

    const updatedItems = selectedOrder.items.filter(
      (item: any) => item.product_id !== productId
    );

    setSelectedOrder({ ...selectedOrder, items: updatedItems });
  };

  return (
    <Box padding="6" width={"98%"}>
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Heading size="md" textAlign={"left"}>
          Orders
        </Heading>
        <Button
          bg={"rgba(156, 216, 210, 1)"}
          _hover={{
            bg: "rgba(156, 216, 210, 0.6)",
          }}
          color="black"
          fontSize={"14px"}
          mt="2"
        >
          Add Order
        </Button>
      </Flex>

      <Flex mb="6" gap="4" flexWrap="wrap">
        <Select
          placeholder="Status"
          width="200px"
          value={filter.status}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </Select>

        <Select
          placeholder="Supplier"
          width="200px"
          value={filter.supplier}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, supplier: e.target.value }))
          }
        >
          <option value="Supplier A">Supplier A</option>
          <option value="Supplier B">Supplier B</option>
        </Select>

        <Select
          placeholder="Payment Type"
          width="200px"
          value={filter.paymentType}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, paymentType: e.target.value }))
          }
        >
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        </Select>

        <Button onClick={resetFilters} colorScheme="gray">
          Reset Filters
        </Button>
      </Flex>

      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
        mt="10"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order #</Th>
              <Th>Customer</Th>
              <Th>Status</Th>
              <Th>Payment Type</Th>
              <Th>Payment Amount</Th>
              <Th>Supplier</Th>
              <Th>Estimated Delivery</Th>
              <Th>Actual Delivery</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map((order) => (
              <Tr key={order.id} fontSize={"14px"}>
                <Td>{order.reference}</Td>
                <Td>{order.customer_id}</Td>
                <Td>{order.status}</Td>
                <Td>{order.payment_type}</Td>
                <Td>${order.payment_amount.toFixed(2)}</Td>
                <Td>{order.supplier_id}</Td>
                <Td>{order.estimated_delivery_date}</Td>
                <Td>{order.actual_delivery_date}</Td>
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
                      <MenuItem onClick={() => handleViewDetails(order.id)}>
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

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          selectedOrder={selectedOrder}
          handleEditQuantity={handleEditQuantity}
          handleDeleteItem={handleDeleteItem}
        />
      )}
    </Box>
  );
};

export default OrdersPage;

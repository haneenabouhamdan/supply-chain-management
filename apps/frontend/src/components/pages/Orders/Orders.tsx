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
  Image,
  Text,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";

import OrderDetailsModal from "./OrderDetails";
import illustration from "../../../assets/illustrations/empty.svg";
import { useGetSuppliers, useOrders } from "../../../resolvers";
import AddOrderModal from "./AddOrderModal";
import { OrderStatus, PaymentStatus } from "./types";
import { formatDate } from "../helpers";
import CreateShipmentModal from "./CreateShipmentsModal";

const OrdersPage = () => {
  const { data: orders, loading, error } = useOrders();
  const { suppliers, loading: loadingSuppliers } = useGetSuppliers();
  const {
    isOpen: isAddOrderOpen,
    onOpen: onAddOrderOpen,
    onClose: onAddOrderClose,
  } = useDisclosure();
  const {
    isOpen: isShipmentOpen,
    onOpen: onShipmentOpen,
    onClose: onShipmentClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]); // Multi-select state
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [filter, setFilter] = useState({
    status: "",
    supplier: "",
    paymentType: "",
  });

  // Filter orders when filters change
  useEffect(() => {
    const filtered = [...orders].filter((order) => {
      return (
        (!filter.status || order.status === filter.status) &&
        (!filter.supplier || order.supplierId === filter.supplier) &&
        (!filter.paymentType || order.paymentType === filter.paymentType)
      );
    });

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

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleViewDetails = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    onOpen();
  };

  if (loading || loadingSuppliers) return <Text>Loading orders...</Text>;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Box padding="6" width={"98%"}>
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Heading size="md" textAlign={"left"}>
          Orders
        </Heading>
        <Flex justifyContent={"space-between"}>
          <Button
            bg={"rgba(156, 216, 210, 1)"}
            _hover={{
              bg: "rgba(156, 216, 210, 0.6)",
            }}
            color="black"
            fontSize={"14px"}
            mt="2"
            ml={2}
            onClick={onAddOrderOpen}
          >
            Add Order
          </Button>
          <Button
            bg={"rgba(156, 216, 210, 1)"}
            _hover={{
              bg: "rgba(156, 216, 210, 0.6)",
            }}
            color="black"
            fontSize={"14px"}
            mt="2"
            ml={2}
            onClick={onShipmentOpen}
            disabled={selectedOrders.length === 0} // Disable if no orders selected
          >
            Create Shipment
          </Button>
        </Flex>
      </Flex>

      <Flex mb="6" gap="4" flexWrap="wrap">
        {/* Filters */}
        <Select
          placeholder="Status"
          width="200px"
          value={filter.status}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          {Object.values(OrderStatus).map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Supplier"
          width="200px"
          value={filter.supplier}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, supplier: e.target.value }))
          }
        >
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Payment Type"
          width="200px"
          value={filter.paymentType}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, paymentType: e.target.value }))
          }
        >
          <option value={PaymentStatus.COD}>COD</option>
          <option value={PaymentStatus.PREPAID}>Prepaid</option>
        </Select>
        <Button onClick={resetFilters} colorScheme="gray">
          Reset Filters
        </Button>
      </Flex>

      {filteredOrders.length === 0 ? (
        <Flex flexDirection="column" alignItems="center" mt="10">
          <Image
            src={illustration}
            alt="No Orders Illustration"
            boxSize="400px"
          />
          <Text mt="4" fontSize="lg" color="gray.600">
            No orders found
          </Text>
        </Flex>
      ) : (
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
                <Th>
                  <Checkbox
                    isChecked={
                      selectedOrders.length === filteredOrders.length &&
                      filteredOrders.length > 0
                    }
                    onChange={(e) =>
                      setSelectedOrders(
                        e.target.checked ? filteredOrders.map((o) => o.id) : []
                      )
                    }
                  />
                </Th>
                <Th>Order #</Th>
                <Th>Customer</Th>
                <Th>Status</Th>
                <Th>Payment Type</Th>
                <Th>Payment Amount</Th>
                <Th>Supplier</Th>
                <Th>Estimated Delivery</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOrders.map((order) => (
                <Tr key={order.id} fontSize={"14px"}>
                  <Td>
                    <Checkbox
                      isChecked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                    />
                  </Td>
                  <Td>{order.reference}</Td>
                  <Td>{order.customer?.name}</Td>
                  <Td>{order.status}</Td>
                  <Td>{order.paymentType}</Td>
                  <Td>${order.paymentAmount.toFixed(2)}</Td>
                  <Td>{order.supplier?.name}</Td>
                  <Td>
                    {order.estimatedDeliveryDate
                      ? formatDate(
                          new Date(order.estimatedDeliveryDate),
                          "HH:mm DD MMM yyyy"
                        )
                      : "-"}
                  </Td>
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
      )}

      <AddOrderModal isOpen={isAddOrderOpen} onClose={onAddOrderClose} />
      <CreateShipmentModal
        isOpen={isShipmentOpen}
        onClose={onShipmentClose}
        selectedOrders={selectedOrders}
      />
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          selectedOrder={selectedOrder}
          supplierDetails={
            suppliers.find((sup) => sup.id === selectedOrder.supplierId) ||
            suppliers[0]
          }
        />
      )}
    </Box>
  );
};

export default OrdersPage;

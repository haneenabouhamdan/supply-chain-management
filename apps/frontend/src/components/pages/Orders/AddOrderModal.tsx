import React, { useState } from "react";
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
  useToast,
  Flex,
  Box,
} from "@chakra-ui/react";
import {
  useCreateOrderMutation,
  useGetCustomersQuery,
  useGetProducts,
  useGetSuppliers,
} from "../../../resolvers";
import { OrderStatus, PaymentStatus } from "./types";

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderDetails {
  customerId: string;
  supplierId: string;
  estimatedDeliveryDate: string;
  reference: string;
  paymentType: string;
  status?: string;
  products: { productId: string; quantity: number }[];
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();

  // Fetch customers, products, and suppliers using custom hooks
  const { customers, loading: loadingCustomers } = useGetCustomersQuery();
  const { products: allProducts, loading: loadingProducts } = useGetProducts();
  const { suppliers, loading: loadingSuppliers } = useGetSuppliers();

  // Filter products with quantity > 0
  const availableProducts = allProducts.filter(
    (product) => product.quantity > 0
  );

  // Mutation hook for creating an order
  const { createOrder, loading: creatingOrder } = useCreateOrderMutation();

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerId: "",
    supplierId: "",
    estimatedDeliveryDate: "",
    reference: "",
    paymentType: "Card",
    products: [{ productId: "", quantity: 1 }],
  });

  const handleProductChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setOrderDetails((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: field === "quantity" ? Number(value) : value,
      };
      return { ...prev, products: updatedProducts };
    });
  };

  const handleAddProductRow = () => {
    setOrderDetails((prev) => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: 1 }],
    }));
  };

  const calculateTotalPayment = () => {
    return orderDetails.products.reduce((total, item) => {
      const product = availableProducts.find(
        (product) => product.id === item.productId
      );
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleSubmitOrder = async () => {
    try {
      const totalPayment = calculateTotalPayment(); // Calculate total payment before submission
      console.log({
        customerId: orderDetails.customerId,
        supplierId: orderDetails.supplierId,
        estimatedDeliveryDate: orderDetails.estimatedDeliveryDate,
        reference: orderDetails.reference,
        paymentAmount: totalPayment,
        paymentType: orderDetails.paymentType,
        status: OrderStatus.REQUESTED,
        items: orderDetails.products.filter((p) => p.productId), // Ensure valid products
      });
      await createOrder({
        payload: {
          customerId: orderDetails.customerId,
          supplierId: orderDetails.supplierId,
          estimatedDeliveryDate: orderDetails.estimatedDeliveryDate,
          reference: orderDetails.reference,
          paymentAmount: totalPayment,
          paymentType: orderDetails.paymentType,
          status: OrderStatus.REQUESTED,
          items: orderDetails.products.filter((p) => p.productId), // Ensure valid products
        },
        onCompleted: () => {
          toast({
            title: "Order Created",
            description: "The order has been created successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        },
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong.",
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
        <ModalHeader>Add New Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Customer Selector */}
          <Select
            placeholder="Select Customer"
            value={orderDetails.customerId}
            onChange={(e) =>
              setOrderDetails((prev) => ({
                ...prev,
                customerId: e.target.value,
              }))
            }
            isDisabled={loadingCustomers}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>

          {/* Supplier Selector */}
          <Select
            placeholder="Select Supplier"
            mt={4}
            value={orderDetails.supplierId}
            onChange={(e) => {
              setOrderDetails((prev) => ({
                ...prev,
                supplierId: e.target.value,
              }));
            }}
            isDisabled={loadingSuppliers}
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </Select>

          {/* Estimated Delivery Date */}
          <Input
            placeholder="Estimated Delivery Date"
            mt={4}
            type="datetime-local"
            value={orderDetails.estimatedDeliveryDate}
            onChange={(e) =>
              setOrderDetails((prev) => ({
                ...prev,
                estimatedDeliveryDate: e.target.value,
              }))
            }
          />

          {/* Order Details */}
          <Input
            placeholder="Order Reference"
            mt={4}
            value={orderDetails.reference}
            onChange={(e) =>
              setOrderDetails((prev) => ({
                ...prev,
                reference: e.target.value,
              }))
            }
          />
          <Select
            placeholder="Payment Type"
            mt={4}
            value={orderDetails.paymentType}
            onChange={(e) =>
              setOrderDetails((prev) => ({
                ...prev,
                paymentType: e.target.value,
              }))
            }
          >
            <option value={PaymentStatus.COD}>COD</option>
            <option value={PaymentStatus.PREPAID}>Prepaid</option>
          </Select>

          {/* Product Selection Rows */}
          {orderDetails.products.map((product, index) => (
            <Flex mt={4} gap={4} key={index}>
              <Select
                placeholder="Select Product"
                value={product.productId}
                onChange={(e) =>
                  handleProductChange(index, "productId", e.target.value)
                }
                isDisabled={loadingProducts}
              >
                {availableProducts.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} - ${prod.price} (Available: {prod.quantity})
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Quantity"
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, "quantity", e.target.value)
                }
                max={
                  availableProducts.find((p) => p.id === product.productId)
                    ?.quantity || 0
                }
              />
            </Flex>
          ))}

          <Button
            mt={4}
            colorScheme="teal"
            onClick={handleAddProductRow}
            isDisabled={loadingProducts}
          >
            Add Another Product
          </Button>

          {/* Total Payment */}
          <Box mt={4}>
            <strong>Total Payment Amount:</strong> $
            {calculateTotalPayment().toFixed(2)}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmitOrder}
            isLoading={creatingOrder}
          >
            Submit Order
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOrderModal;

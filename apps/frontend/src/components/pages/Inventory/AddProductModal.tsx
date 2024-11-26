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
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useCreateProductMutation } from "../../../resolvers";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const { createProduct, loading } = useCreateProductMutation();

  // Initial product state
  const initialProductState = {
    sku: "",
    name: "",
    description: "",
    price: 0,
    threshold: 0,
    category: "",
    quantity: 0,
  };

  const [product, setProduct] = useState(initialProductState);

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Reset form to its initial state
  const resetForm = () => {
    setProduct(initialProductState);
  };

  const handleSubmit = async () => {
    try {
      await createProduct(product, (newProduct) => {
        toast({
          title: "Product Added",
          description: `${newProduct.name} has been successfully added.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        resetForm(); // Reset the form after a successful submission
        onClose(); // Close the modal
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg="white" maxW="700px">
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>SKU</FormLabel>
            <Input
              placeholder="Enter SKU"
              value={product.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter Product Name"
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Enter Description"
              value={product.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Enter Price"
              type="number"
              value={product.price}
              onChange={(e) =>
                handleChange("price", parseFloat(e.target.value))
              }
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Threshold</FormLabel>
            <Input
              placeholder="Enter Threshold"
              type="number"
              value={product.threshold}
              onChange={(e) =>
                handleChange("threshold", parseInt(e.target.value))
              }
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Category</FormLabel>
            <Input
              placeholder="Enter Category"
              value={product.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Quantity</FormLabel>
            <Input
              placeholder="Enter Quantity"
              type="number"
              value={product.quantity}
              onChange={(e) =>
                handleChange("quantity", parseInt(e.target.value))
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="teal.400"
            color="white"
            _hover={{ bg: "teal.500" }}
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Add Product
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;

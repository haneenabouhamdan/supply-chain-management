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

interface AdjustStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any; // Adjust this type to match your product structure
  onSave: (updatedProduct: any) => void;
}

const AdjustStockModal: React.FC<AdjustStockModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
}) => {
  const toast = useToast();
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [threshold, setThreshold] = useState(product?.threshold || 0);

  const handleSave = () => {
    const updatedProduct = { ...product, quantity, threshold };
    onSave(updatedProduct);
    toast({
      title: "Stock Updated",
      description: `${product.name} stock has been successfully updated.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" maxW="600px">
        <ModalHeader>Adjust Stock</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Product Name</FormLabel>
            <Input value={product?.name || ""} isReadOnly />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Threshold</FormLabel>
            <Input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="teal.400"
            color="white"
            _hover={{ bg: "teal.500" }}
            mr={3}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdjustStockModal;

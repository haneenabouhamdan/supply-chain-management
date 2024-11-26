import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useCreateShipment } from "../../../resolvers";
import { ShipmentStatus } from "../Shipments/types";
import { formatDate } from "../helpers";

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrders: string[]; // Array of selected order IDs
}

const CreateShipmentModal: React.FC<CreateShipmentModalProps> = ({
  isOpen,
  onClose,
  selectedOrders,
}) => {
  const toast = useToast();
  const { createShipment, loading } = useCreateShipment();

  const [formValues, setFormValues] = useState({
    status: ShipmentStatus.CREATED,
    trackingNumber: "",
    driverId: "",
  });

  const handleChange = (
    field: keyof typeof formValues,
    value: string | ShipmentStatus
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createShipment({
        status: formValues.status,
        trackingNumber: formValues.trackingNumber,
        driverId: formValues.driverId,
        startTime: formatDate(new Date(), "DD mm yyyy"),
        endTime: formatDate(
          new Date(Date.now() + 24 * 60 * 60 * 1000),
          "DD MM YYYY"
        ),
      });

      toast({
        title: "Shipment Created",
        description: "The shipment has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose(); // Close the modal
    } catch (error) {
      toast({
        title: "Error Creating Shipment",
        description: error?.message || "An error occurred.",
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
        <ModalHeader>Create Shipment</ModalHeader>
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Status</FormLabel>
            <Select
              value={formValues.status}
              onChange={(e) =>
                handleChange("status", e.target.value as ShipmentStatus)
              }
            >
              {Object.values(ShipmentStatus).map((status) => (
                <option key={status} value={status}>
                  {status.replace("_", " ")} {/* Format for readability */}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Tracking Number</FormLabel>
            <Input
              placeholder="Enter tracking number"
              value={formValues.trackingNumber}
              onChange={(e) => handleChange("trackingNumber", e.target.value)}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Driver</FormLabel>
            <Input
              placeholder="Enter driver ID"
              value={formValues.driverId}
              onChange={(e) => handleChange("driverId", e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={loading}
            disabled={selectedOrders.length === 0} // Disable if no orders selected
          >
            Create Shipment
          </Button>
          <Button onClick={onClose} ml="3">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateShipmentModal;

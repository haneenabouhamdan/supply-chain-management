import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Button,
  Select,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useDisclosure,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import AddProductModal from "./AddProductModal";
import { useGetInventories } from "../../../resolvers/inventory";
import { useGetSuppliers } from "../../../resolvers/supplier"; // Import supplier resolver
import AdjustStockModal from "./AdjustStockModal";
import { useUpdateProductMutation } from "../../../resolvers";
import { Inventory } from "../../../resolvers/inventory/inventory.types";
import WebSocketService from "../../../resolvers/websoket/websocket.service";

// Define the type for the filters
type Filters = {
  location?: string;
  lowStock?: boolean;
  category?: string;
  supplier?: string;
};

// Predefined list of locations
const LOCATIONS = ["Warehouse A", "Warehouse B", "Warehouse C"];
const CATEGORIES = ["Electronics", "Furniture", "Apparel", "Food"];

const InventoryPage = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [inventoriesData, setInventoriesData] = useState<Inventory[]>([]);
  const { inventories, loading, error } = useGetInventories(filters);
  const {
    suppliers,
    loading: suppliersLoading,
    error: suppliersError,
  } = useGetSuppliers(); // Fetch suppliers from backend
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isAdjustOpen,
    onOpen: onAdjustOpen,
    onClose: onAdjustClose,
  } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { updateProduct } = useUpdateProductMutation();

  useEffect(() => {
    setInventoriesData(inventories);

    const handleInventoryUpdates = (updates: Inventory[]) => {
      setInventoriesData(updates);
    };

    WebSocketService.onInventoryUpdate(handleInventoryUpdates);

    return () => {
      WebSocketService.socket.off("inventoryUpdate", handleInventoryUpdates);
    };
  }, [inventories]);

  // Update filters only with values set by the user
  const updateFilter = (
    key: keyof Filters,
    value: Filters[keyof Filters] | undefined
  ) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (value !== undefined) {
        updatedFilters[key] = value;
      } else {
        delete updatedFilters[key];
      }
      return updatedFilters;
    });
  };

  const resetFilters = () => {
    setFilters({});
  };

  const handleAction = (action: string, item: any) => {
    if (action === "Adjust Stock") {
      setSelectedProduct(item);
      onAdjustOpen();
    }
  };

  const handleSaveAdjustments = async (updatedData: any) => {
    const { inventoryId, ...updatedProduct } = updatedData;

    await updateProduct(updatedProduct.id, updatedProduct);
    onAdjustClose();
  };

  if (loading || suppliersLoading) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="xl" />
        <Text mt="4">Loading inventory...</Text>
      </Box>
    );
  }

  if (error || suppliersError) {
    return (
      <Box textAlign="center" mt="10">
        <Text color="red.500">Error fetching data</Text>
      </Box>
    );
  }

  // Filtered inventory data based on the lowStock condition
  const filteredInventories = filters.lowStock
    ? inventoriesData
        .map((inv) => ({
          ...inv,
          products: inv.products?.filter(
            (product) => product.quantity < (product.threshold || 0)
          ),
        }))
        .filter((inv) => inv.products.length > 0) // Remove inventories with no low stock products
    : inventoriesData;

  return (
    <Box padding="6" width={"98%"}>
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Heading size="md" textAlign={"left"}>
          Inventory
        </Heading>
        <Button
          bg="teal.400"
          color="white"
          _hover={{ bg: "teal.500" }}
          onClick={onAddOpen}
        >
          Add Product
        </Button>
      </Flex>

      <Flex mb="6" gap="4" flexWrap="wrap" ml="2">
        <Select
          placeholder="Location"
          width="200px"
          value={filters.location || ""}
          onChange={(e) => updateFilter("location", e.target.value)}
        >
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </Select>
        <Button
          onClick={() =>
            updateFilter("lowStock", !filters.lowStock ? true : undefined)
          }
          bg={filters.lowStock ? "rgba(255, 99, 132, 1)" : "white"}
          _hover={{
            bg: filters.lowStock ? "rgba(255, 99, 132, 0.6)" : "white",
          }}
          color="black"
          fontSize={"sm"}
          border="1px solid #e4e7eb"
        >
          Low Stock
        </Button>

        <Select
          placeholder="Category"
          width="200px"
          value={filters.category || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Supplier"
          width="200px"
          value={filters.supplier || ""}
          onChange={(e) => updateFilter("supplier", e.target.value)}
        >
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
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
              <Th>Product Name</Th>
              <Th>Location</Th>
              <Th>Quantity</Th>
              <Th>Supplier</Th>
              <Th>SKU</Th>
              <Th>Price</Th>
              <Th>Threshold</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredInventories.flatMap((inv) =>
              inv.products?.map((product, index) => (
                <Tr
                  key={`${inv.location}-${index}`}
                  fontSize={"14px"}
                  textAlign={"center"}
                >
                  <Td>{product.name}</Td>
                  <Td>{inv.location}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>{inv.supplier?.name}</Td>
                  <Td>{product.sku}</Td>
                  <Td>${product.price}</Td>
                  <Td>{product.threshold}</Td>
                  <Td>{product.category}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiMoreVertical />}
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem
                          onClick={() => handleAction("Adjust Stock", product)}
                        >
                          Adjust Stock
                        </MenuItem>
                        <MenuItem onClick={() => handleAction("Edit", product)}>
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleAction("Delete", product)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
      <AddProductModal isOpen={isAddOpen} onClose={onAddClose} />
      {selectedProduct && (
        <AdjustStockModal
          isOpen={isAdjustOpen}
          onClose={onAdjustClose}
          product={selectedProduct}
          onSave={handleSaveAdjustments}
        />
      )}
    </Box>
  );
};

export default InventoryPage;

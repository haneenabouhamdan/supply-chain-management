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
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";

interface InventoryItem {
  product_id: string;
  location: string;
  quantity: number;
  supplier_id: string;
  sku?: string;
  name?: string;
  description?: string;
  price?: number;
  threshold?: number;
  category?: string;
}

// Mock inventory data
const inventoryData = [
  {
    product_id: "1",
    location: "Warehouse A",
    quantity: 100,
    supplier_id: "Supplier A",
  },
  {
    product_id: "2",
    location: "Warehouse B",
    quantity: 50,
    supplier_id: "Supplier B",
  },
];

// Mock product data
const productData = [
  {
    product_id: "1",
    sku: "SKU001",
    name: "Product A",
    description: "Description for Product A",
    price: 25.5,
    threshold: 10,
    category: "Category A",
  },
  {
    product_id: "2",
    sku: "SKU002",
    name: "Product B",
    description: "Description for Product B",
    price: 40.0,
    threshold: 5,
    category: "Category B",
  },
];

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(
    []
  );
  const [filter, setFilter] = useState({
    lowStock: false,
    category: "",
    supplier: "",
  });

  // Fetch and merge inventory and product data
  useEffect(() => {
    const combinedData = inventoryData.map((inv) => {
      const product = productData.find(
        (prod) => prod.product_id === inv.product_id
      );
      return {
        ...inv,
        ...product, // Merge product details into inventory
      };
    });
    setInventory(combinedData);
    setFilteredInventory(combinedData);
  }, []);

  // Handle Filters
  useEffect(() => {
    let filtered = [...inventory];

    // Filter by low stock
    if (filter.lowStock) {
      filtered = filtered.filter(
        (item) => item.quantity <= Number(item?.threshold)
      );
    }

    // Filter by category
    if (filter.category) {
      filtered = filtered.filter((item) => item.category === filter.category);
    }

    // Filter by supplier
    if (filter.supplier) {
      filtered = filtered.filter(
        (item) => item.supplier_id === filter.supplier
      );
    }

    setFilteredInventory(filtered);
  }, [filter, inventory]);

  // Reset Filters
  const resetFilters = () => {
    setFilter({
      lowStock: false,
      category: "",
      supplier: "",
    });
    setFilteredInventory(inventory);
  };

  const handleAction = (action: string, item: InventoryItem) => {
    console.log(`${action} clicked for`, item);
  };

  return (
    <Box padding="6" width={"98%"}>
      <Heading size="md" mb="8" ml="2" textAlign={"left"}>
        Inventory
      </Heading>
      <Flex mb="6" gap="4" flexWrap="wrap" ml="2">
        <Button
          onClick={() =>
            setFilter((prev) => ({ ...prev, lowStock: !prev.lowStock }))
          }
          bg={filter.lowStock ? "rgba(255, 99, 132, 1)" : "white"}
          _hover={{
            bg: filter.lowStock ? "rgba(255, 99, 132, 0.6)" : "white",
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
          value={filter.category}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="Category A">Category A</option>
          <option value="Category B">Category B</option>
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

        {/* Reset Filters Button */}
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
            {filteredInventory.map((item, index) => (
              <Tr key={index} fontSize={"14px"} textAlign={"center"}>
                <Td>{item.name}</Td>
                <Td>{item.location}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.supplier_id}</Td>
                <Td>{item.sku}</Td>
                <Td>${item.price?.toFixed(2)}</Td>
                <Td>{item.threshold}</Td>
                <Td>{item.category}</Td>
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
                        onClick={() => handleAction("Adjust Stock", item)}
                      >
                        Adjust Stock
                      </MenuItem>
                      <MenuItem onClick={() => handleAction("Edit", item)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleAction("Delete", item)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default InventoryPage;

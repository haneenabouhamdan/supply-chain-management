import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import { FiTrendingUp } from "react-icons/fi";

interface StatCardProps {
  value: string;
  color: string;
  title: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <Box
      bg={color}
      borderRadius="md"
      boxShadow="sm"
      p="4"
      width="180px"
      height="100px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Text fontSize="md" fontWeight="medium" color="gray.700" textAlign="left">
        {title}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mt="2">
        <Text fontSize="lg" fontWeight="bold">
          {value}
        </Text>
        <Icon as={FiTrendingUp} boxSize="5" color="gray.600" />
      </Flex>
    </Box>
  );
};

export default StatCard;

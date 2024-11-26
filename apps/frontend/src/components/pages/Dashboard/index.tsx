import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useGetProfileQuery } from "../../../resolvers";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import StatCard from "../../common/StatCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

interface Props {}

const Dashboard: React.FC<Props> = ({}) => {
  const { getCurrentUser, user } = useGetProfileQuery();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, user]);

  const inventoryData = [
    { product: "Product A", stock: 120, sales: 80 },
    { product: "Product B", stock: 200, sales: 150 },
    { product: "Product C", stock: 80, sales: 60 },
    { product: "Product D", stock: 50, sales: 30 },
  ];

  const inventoryAgingData = {
    days: ["0-30 days", "31-60 days", "61-90 days", "91+ days"],
    products: [50, 40, 30, 20],
  };

  const inventoryCategoryData = {
    categories: ["Electronics", "Furniture", "Apparel", "Food"],
    stock: [300, 150, 200, 100],
  };

  // Bar Chart Data
  const barChartData = {
    labels: inventoryData.map((item) => item.product),
    datasets: [
      {
        label: "Stock",
        data: inventoryData.map((item) => item.stock),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Sales",
        data: inventoryData.map((item) => item.sales),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data
  const lineChartData = {
    labels: inventoryAgingData.days,
    datasets: [
      {
        label: "Products",
        data: inventoryAgingData.products,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: inventoryCategoryData.categories,
    datasets: [
      {
        label: "Stock",
        data: inventoryCategoryData.stock,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const cards = [
    { value: "$36.0M", title: "sales", color: "cyan.100" },
    { value: "$6.5M", title: "sales", color: "blue.100" },
    { value: "$45.3M", title: "sales", color: "pink.100" },
    { value: "$3.2M", title: "sales", color: "purple.100" },
  ];

  // Average Height for Charts
  const chartHeight = 350;

  return (
    <Box padding="4" width="100%">
      <Heading size="md" mb="6" textAlign="left" m={4}>
        Dashboard
      </Heading>
      <Box mb="6" padding="4" width="60%">
        <Flex
          gap="4"
          justifyContent={{ base: "center", md: "space-between" }}
          flexWrap="wrap"
        >
          {cards.map((card, index) => (
            <StatCard
              key={index}
              value={card.value}
              color={card.color}
              title={card.title}
            />
          ))}
        </Flex>
      </Box>
      <Flex
        flexWrap="wrap"
        gap="6"
        pt={8}
        justifyContent="space-around"
        alignItems="center"
        paddingX="4"
      >
        <Box
          width={{ base: "100%", md: "45%", lg: "30%" }}
          height={`${chartHeight}px`}
          p={4}
        >
          <Heading size="md" mb="4" textAlign="center">
            Stock vs Sales
          </Heading>
          <Bar
            data={barChartData}
            options={{ maintainAspectRatio: false }}
            height={chartHeight}
          />
        </Box>
        <Box
          width={{ base: "100%", md: "45%", lg: "30%" }}
          height={`${chartHeight}px`}
          p={4}
        >
          <Heading size="md" mb="4" textAlign="center">
            Inventory Aging
          </Heading>
          <Line
            data={lineChartData}
            options={{ maintainAspectRatio: false }}
            height={chartHeight}
          />
        </Box>
        <Box
          width={{ base: "100%", md: "45%", lg: "30%" }}
          height={`${chartHeight}px`}
          p={4}
        >
          <Heading size="md" mb="4" textAlign="center">
            Stock by Category
          </Heading>
          <Pie
            data={pieChartData}
            options={{ maintainAspectRatio: false }}
            height={chartHeight}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;

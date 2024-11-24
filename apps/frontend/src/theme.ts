import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    green: {
      500: "#63BAAB",
    },
    pink: {
      500: "#c01b4a",
      300: "#da426d",
    },
    purple: {
      500: "#48548c",
      300: "#6f7ab0",
    },
    orange: {
      500: "#f4a261",
      300: "#f7ba8a",
    },
    blue: {
      500: "#1f79f6",
      100: "#d6e7ff",
      300: "#60a0f9",
    },
    black: {
      500: "#000000",
    },
    white: {
      500: "#ffffff",
    },
    gray: {
      500: "#98a2b3",
      300: "#b7beca",
    },
  },
});

export default theme;

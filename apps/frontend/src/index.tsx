import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { GraphQLProvider, AuthenticationProvider } from "./providers";
import { Helmet } from "react-helmet";
import { router } from "./routes/Routes";
import { NotificationProvider } from "./providers/NotificationProvider";
import theme from "./theme";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GraphQLProvider>
        <AuthenticationProvider>
          <NotificationProvider>
            <Helmet defaultTitle="supplyChain" />
            <RouterProvider router={router} />
          </NotificationProvider>
        </AuthenticationProvider>
      </GraphQLProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Config } from "../config";
import { useToast } from "@chakra-ui/react";

interface GraphQLProviderProps {
  children: ReactNode;
}

interface HTTPContextValues {
  authenticate: (token: string) => void;
  graphQLClient: ApolloClient<NormalizedCacheObject> | null;
}

const HTTPContext = createContext<HTTPContextValues | null>(null);

const getApolloLinks = (toast: ReturnType<typeof useToast>, token?: string) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, extensions }) => {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      });
    }

    if (networkError) {
      toast({
        title: "Network Error",
        description: "A network error occurred. Please try again.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  });

  const httpLink = createHttpLink({
    uri: Config.GRAPHQL_ENDPOINT,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return errorLink.concat(httpLink);
};

const createGraphQLClient = (
  toast: ReturnType<typeof useToast>,
  token?: string
) =>
  new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    connectToDevTools: true,
    link: getApolloLinks(toast, token),
  });

export const GraphQLProvider = ({ children }: GraphQLProviderProps) => {
  const [graphQLClient, setGraphQLClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const toast = useToast();
  const toastRef = useRef(toast);

  useEffect(() => {
    const token = localStorage.getItem("token") ?? undefined;
    setGraphQLClient(createGraphQLClient(toastRef.current, token));
  }, []);

  const authenticate = useCallback((token: string) => {
    localStorage.setItem("token", token);
    setGraphQLClient(() => createGraphQLClient(toastRef.current, token));
  }, []);

  const httpProviderValue = useMemo(
    () => ({ authenticate, graphQLClient }),
    [authenticate, graphQLClient]
  );

  if (!graphQLClient) {
    return <div>Loading GraphQL Client...</div>;
  }

  return (
    <ApolloProvider client={graphQLClient}>
      <HTTPContext.Provider value={httpProviderValue}>
        {children}
      </HTTPContext.Provider>
    </ApolloProvider>
  );
};

export const useHTTPContext = () => {
  const context = useContext(HTTPContext);
  if (!context) {
    throw new Error("useHTTPContext must be used within a GraphQLProvider");
  }
  return context;
};

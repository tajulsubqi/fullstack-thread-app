import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "./store/RootReducer.ts"
import { BrowserRouter } from "react-router-dom"

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "dark",
        color: "none",
        minHeight: "100vh",
      },
    },
  },
  colors: {
    dark: "#111",
    color: "white",
    _hover: {
      textDecoration: "underline",
    },
  },
})

const queryClient = new QueryClient()

const store = configureStore({
  reducer: RootReducer,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

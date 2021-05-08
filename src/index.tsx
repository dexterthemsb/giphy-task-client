import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { theme } from "./config/theme";
import { AuthContextProvider } from "./context/authContext";
import { GIFContextProvider } from "./context/gifContext";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <GIFContextProvider>
          <Router>
            <App />
          </Router>
        </GIFContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

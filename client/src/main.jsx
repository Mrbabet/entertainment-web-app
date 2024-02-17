import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      color: mode("#fff", "#fff")(props),
      bg: mode("gray.100", "#10141E")(props),
    },
    "input::placeholder": {
      color: props.colorMode === "dark" ? "#979797" : "#CBD5E0",
    },
  }),
};
const theme = extendTheme({
  styles,
  fonts: {
    body: "Outfit, sans-serif",
    heading: "Outfit, sans-serif",
  },
  fontSizes: {
    xl: "32px",
    lg: "24px",
    md: "18px",
    sm: "15px",
    xs: "13px",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

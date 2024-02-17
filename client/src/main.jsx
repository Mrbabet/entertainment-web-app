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
  breakpoints: {
    base: "0em", // 0px
    sm: "30em", // ~480px. em is a relative unit and is dependant on the font-size.
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "#FC4747",
          color: "#fff",
          _hover: {
            bg: "#fff",
            color: "161D2F",
          },
        },
      },
    },
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

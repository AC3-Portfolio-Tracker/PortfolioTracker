import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css"; // Or your global CSS file

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Example primary color
    },
    secondary: {
      main: "#f48fb1", // Example secondary color
    },
    background: {
      default: "#222", // Your dark background color
      paper: "#333", // Example paper background for cards etc.
    },
    text: {
      primary: "#fff", // Your primary text color
      secondary: "#ccc", // Your secondary text color
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
  
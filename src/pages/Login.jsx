import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import { Lock, Person } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles"; // Import useTheme

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius * 2, // More rounded corners
  boxShadow: theme.shadows[8], // Slightly more prominent shadow
  backgroundColor: theme.palette.background.paper,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0, 3, 0), // Increased vertical spacing
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4), // More padding
  fontSize: "1rem",
  fontWeight: 600, // Semi-bold text
  borderRadius: theme.shape.borderRadius * 2,
  margin: theme.spacing(3, 0, 2, 0),
}));

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme(); // Use the theme for dynamic styling

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login submitted:", { email, password });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={theme.palette.background.default} // Use theme background
    >
      <StyledPaper>
        <Typography variant="h4" gutterBottom color="primary">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <StyledTextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: <Person color="action" sx={{ mr: 1 }} />, // Add some spacing
            }}
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: <Lock color="action" sx={{ mr: 1 }} />, // Add some spacing
            }}
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Log In
          </StyledButton>
          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link href="/signup" variant="subtitle2" color="primary">
                Create one
              </Link>
            </Typography>
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
}

export default LoginPage;

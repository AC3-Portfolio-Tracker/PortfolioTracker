import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box, Link } from "@mui/material";
import { Person, Lock, Mail, Phone } from "@mui/icons-material";
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

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const theme = useTheme(); // Use the theme

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sign Up submitted:", {
      name,
      email,
      phone,
      password,
      confirmPassword,
    });
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
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
          Create Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <StyledTextField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            InputProps={{
              startAdornment: <Person color="action" sx={{ mr: 1 }} />,
            }}
          />
          <StyledTextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: <Mail color="action" sx={{ mr: 1 }} />,
            }}
          />
          <StyledTextField
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            InputProps={{
              startAdornment: <Phone color="action" sx={{ mr: 1 }} />,
            }}
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
            }}
          />
          <StyledTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
            }}
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign Up
          </StyledButton>
          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link href="/login" variant="subtitle2" color="primary">
                Log In
              </Link>
            </Typography>
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
}

export default SignUpPage;

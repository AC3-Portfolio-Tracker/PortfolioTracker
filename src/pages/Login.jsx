import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
<<<<<<< HEAD
  // IconButton, // Not used
  Alert,
} from "@mui/material";
import { Lock, Person } from "@mui/icons-material"; // Keeping original icons
=======
  IconButton,
  Alert,
} from "@mui/material";
import { Lock, Person } from "@mui/icons-material";
>>>>>>> my-backup
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
<<<<<<< HEAD
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[8],
=======
  borderRadius: theme.shape.borderRadius * 2, // More rounded corners
  boxShadow: theme.shadows[8], // Slightly more prominent shadow
>>>>>>> my-backup
  backgroundColor: theme.palette.background.paper,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
<<<<<<< HEAD
  margin: theme.spacing(1.5, 0, 2, 0), // Adjusted vertical spacing slightly
=======
  margin: theme.spacing(2, 0, 3, 0), // Increased vertical spacing
>>>>>>> my-backup
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
<<<<<<< HEAD
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 2,
  margin: theme.spacing(2.5, 0, 2, 0), // Adjusted margin
}));

const LogoText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3), // Space below the logo
  fontWeight: "bold",
  color: theme.palette.primary.main, // Use primary color for logo
  textDecoration: "none", // Remove underline from link
  "&:hover": {
    color: theme.palette.primary.dark, // Darken on hover for feedback
  },
=======
  padding: theme.spacing(1.5, 4), // More padding
  fontSize: "1rem",
  fontWeight: 600, // Semi-bold text
  borderRadius: theme.shape.borderRadius * 2,
  margin: theme.spacing(3, 0, 2, 0),
>>>>>>> my-backup
}));

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { user } = await signIn(email, password);
<<<<<<< HEAD
      console.log("Login successful", user);
      // Redirect to the intended page after login.
      // If the user was trying to access a protected route, they might be redirected there.
      // Otherwise, navigate to home or dashboard. '/' might lead to LandingPage if still unauth.
      // For now, let's assume successful sign-in implies isAuthenticated becomes true,
      // so navigating to "/" will then be handled by App.js to redirect to "/home".
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.message || "Failed to sign in. Please check your credentials."
      );
=======
      navigate("/"); // Redirect to home page after login
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
>>>>>>> my-backup
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
<<<<<<< HEAD
      bgcolor={theme.palette.background.default}
    >
      <StyledPaper>
        {/* Logo Text - Clickable */}
        <LogoText
          variant="h5"
          component={RouterLink}
          to="/" // Navigate to the main landing page
        >
          Portfolio Tracker
        </LogoText>

        <Typography variant="h4" gutterBottom color="primary">
          Sign In
        </Typography>

=======
      bgcolor={theme.palette.background.default} // Use theme background
    >
      <StyledPaper>
        <Typography variant="h4" gutterBottom color="primary">
          Sign In
        </Typography>
        
>>>>>>> my-backup
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
<<<<<<< HEAD

=======
        
>>>>>>> my-backup
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <StyledTextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
<<<<<<< HEAD
              startAdornment: <Person color="action" sx={{ mr: 1 }} />,
=======
              startAdornment: <Person color="action" sx={{ mr: 1 }} />, // Add some spacing
>>>>>>> my-backup
            }}
            disabled={loading}
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
<<<<<<< HEAD
              startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
=======
              startAdornment: <Lock color="action" sx={{ mr: 1 }} />, // Add some spacing
>>>>>>> my-backup
            }}
            disabled={loading}
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing In..." : "Log In"}
          </StyledButton>
          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
<<<<<<< HEAD
              <Link
                component={RouterLink}
                to="/signup"
                variant="subtitle2" // Keep if you like the slightly bolder look for links
                color="primary"
              >
=======
              <Link component={RouterLink} to="/signup" variant="subtitle2" color="primary">
>>>>>>> my-backup
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

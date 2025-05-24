import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
  Grid,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
<<<<<<< HEAD
  maxWidth: 550, // Increased maxWidth to make the form and fields wider
=======
  maxWidth: 500,
>>>>>>> my-backup
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[8],
  backgroundColor: theme.palette.background.paper,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
<<<<<<< HEAD
  // The width will be controlled by the parent Grid item (fullWidth prop on TextField or width: "100%" here)
=======
  margin: theme.spacing(1.5, 0),
>>>>>>> my-backup
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 2,
  margin: theme.spacing(3, 0, 2, 0),
}));

<<<<<<< HEAD
const LogoText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

=======
>>>>>>> my-backup
function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
<<<<<<< HEAD

=======
    
    // Validate passwords match
>>>>>>> my-backup
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
<<<<<<< HEAD
    setSuccess(false);

    try {
=======

    try {
      // Additional user data to store in the profile
>>>>>>> my-backup
      const userData = {
        first_name: firstName,
        last_name: lastName,
      };

<<<<<<< HEAD
      const result = await signUp(email, password, userData);

      if (result && result.needsConfirmation) {
        setSuccess(true);
      } else if (result && result.user) {
        navigate("/");
      } else {
        setSuccess(true);
=======
      const { user } = await signUp(email, password, userData);
      
      // If no user is returned, it might mean email confirmation is required
      if (!user) {
        setSuccess(true);
      } else {
        // If we have the user right away, redirect to home
        navigate("/");
>>>>>>> my-backup
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
  // Show success message if email confirmation is required
>>>>>>> my-backup
  if (success) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={theme.palette.background.default}
<<<<<<< HEAD
        p={2}
      >
        <StyledPaper>
          {" "}
          {/* Using StyledPaper for consistency even in success message */}
          <LogoText variant="h5" component={RouterLink} to="/">
            Portfolio Tracker
          </LogoText>
          <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 2 }}>
            Verification Email Sent
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            A confirmation email has been sent to {email}. Please check your
            inbox and click the link to confirm your account.
=======
      >
        <StyledPaper>
          <Typography variant="h5" gutterBottom color="primary">
            Verification Email Sent
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            A confirmation email has been sent to {email}. Please check your inbox and click the link to confirm your account.
>>>>>>> my-backup
          </Typography>
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
          >
            Return to Login
          </Button>
        </StyledPaper>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
<<<<<<< HEAD
      p={2}
    >
      <StyledPaper>
        <LogoText variant="h5" component={RouterLink} to="/">
          Portfolio Tracker
        </LogoText>

        <Typography variant="h4" gutterBottom color="primary">
          Create Account
        </Typography>

=======
    >
      <StyledPaper>
        <Typography variant="h4" gutterBottom color="primary">
          Create Account
        </Typography>
        
>>>>>>> my-backup
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
<<<<<<< HEAD

        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: theme.spacing(1) }}
        >
          {/* Grid container will manage spacing between rows of fields */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {" "}
              {/* Changed sm={6} to xs={12} */}
=======
        
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
>>>>>>> my-backup
              <StyledTextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
<<<<<<< HEAD
                fullWidth // Ensures it takes full width of Grid item
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              {/* Changed sm={6} to xs={12} */}
=======
                fullWidth
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
>>>>>>> my-backup
              <StyledTextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
<<<<<<< HEAD
                fullWidth // Ensures it takes full width of Grid item
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
=======
>>>>>>> my-backup
                fullWidth
                disabled={loading}
              />
            </Grid>
          </Grid>
<<<<<<< HEAD

=======
          
          <StyledTextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />
          
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />
          
          <StyledTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />
          
>>>>>>> my-backup
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </StyledButton>
<<<<<<< HEAD

          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                variant="subtitle2"
                color="primary"
              >
=======
          
          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" variant="subtitle2" color="primary">
>>>>>>> my-backup
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
}

export default SignupPage;

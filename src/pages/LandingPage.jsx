import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  TrendingUp,
  ShowChart,
  Upload,
  Security,
  Dashboard,
} from "@mui/icons-material";

// Updated FeatureItem for dark theme appearance as per the image
const FeatureItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800], // Darker card background
  color: theme.palette.common.white, // Default text color for title
  padding: theme.spacing(3),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start", // Keep content aligned to the top
  boxShadow: "none", // No shadow by default as per the image
  borderRadius: theme.shape.borderRadius, // Standard MUI border radius
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8], // A moderate shadow on hover
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius * 2.5,
  fontWeight: 700,
  fontSize: "1rem",
}));

const LandingPage = () => {
  const theme = useTheme();

  const features = [
    {
      icon: Upload,
      title: "Easy Import",
      desc: "Import your investment data from various brokers with a simple CSV upload.",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      desc: "Track your portfolio's performance over time with insightful metrics and charts.",
    },
    {
      icon: ShowChart,
      title: "Advanced Analytics",
      desc: "Analyze your investment strategy with powerful tools and visualizations.",
    },
    {
      icon: Security,
      title: "Secure Storage",
      desc: "Your data is securely stored and encrypted for your peace of mind.",
    },
  ];

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Hero Section (remains light themed as per previous styling) */}
      <Box
        sx={{
          bgcolor: "background.default",
          pt: { xs: 8, sm: 10, md: 12 },
          pb: { xs: 8, sm: 10, md: 12 },
          borderBottomLeftRadius: { xs: "30px", md: "50px" },
          borderBottomRightRadius: { xs: "30px", md: "50px" },
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                }}
              >
                Track Your Investments
                <Box component="span" sx={{ color: "primary.main" }}>
                  {" "}
                  Effortlessly
                </Box>
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mb: 3,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                }}
              >
                Monitor your portfolio performance, track dividends, and analyze
                your investment strategy with our powerful tools.
              </Typography>
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <HeroButton
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/signup"
                >
                  Get Started
                </HeroButton>
                <HeroButton
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/login"
                >
                  Sign In
                </HeroButton>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { xs: 6, md: 0 },
              }}
            >
              <Box
                sx={{
                  maxWidth: { xs: "90%", sm: 450, md: 500 },
                  width: "100%",
                  height: { xs: 280, sm: 320, md: 360 },
                  boxShadow: theme.shadows[6],
                  borderRadius: theme.shape.borderRadius * 2.5,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "background.paper",
                  p: { xs: 2, sm: 3 },
                  textAlign: "center",
                }}
              >
                <Dashboard
                  sx={{
                    fontSize: { xs: 50, sm: 60, md: 70 },
                    mb: 2,
                    color: "primary.main",
                  }}
                />
                <Typography variant="h6" component="h3" fontWeight="medium">
                  Portfolio Dashboard
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, px: 1 }}
                >
                  A glimpse into your powerful dashboard.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Styled to match the dark image provided */}
      <Box
        component="section" // Semantic HTML
        sx={{
          pt: { xs: 6, md: 10 },
          pb: { xs: 6, md: 10 },
          bgcolor: theme.palette.grey[900], // Dark background for the entire section
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            fontWeight="bold"
            sx={{
              mb: { xs: 4, md: 6 },
              fontSize: { xs: "1.8rem", sm: "2.25rem", md: "2.5rem" },
              color: theme.palette.common.white, // Title color for dark background
            }}
          >
            Key Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureItem>
                  {" "}
                  {/* elevation is handled by styled component */}
                  <Box sx={{ color: "#64b5f6", mb: 2 }}>
                    {" "}
                    {/* Light blue for icons (MUI blue[300]) */}
                    <feature.icon sx={{ fontSize: 50 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    fontWeight="medium"
                    gutterBottom
                  >
                    {/* Text color is inherited from FeatureItem (common.white) */}
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.grey[400] }}
                  >
                    {" "}
                    {/* Lighter grey for description */}
                    {feature.desc}
                  </Typography>
                </FeatureItem>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

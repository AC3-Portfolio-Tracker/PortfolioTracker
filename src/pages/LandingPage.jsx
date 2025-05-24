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
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { TrendingUp, ShowChart, Upload, Security, Dashboard } from "@mui/icons-material";

const FeatureItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 5),
  borderRadius: theme.shape.borderRadius * 3,
  fontWeight: 600,
  fontSize: "1.1rem",
  margin: theme.spacing(2, 2),
}));

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "background.default",
          pt: 12,
          pb: 12,
          borderRadius: "0 0 20% 20%",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                Track Your Investments
                <Box component="span" sx={{ color: "primary.main" }}>
                  {" "}
                  Effortlessly
                </Box>
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Monitor your portfolio performance, track dividends, and analyze
                your investment strategy with our powerful tools.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <HeroButton
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/signup"
                >
                  Get Started
                </HeroButton>
                <HeroButton
                  variant="outlined"
                  color="primary"
                  size="large"
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
              }}
            >
              <Box
                sx={{
                  maxWidth: "100%",
                  height: 400,
                  width: 600,
                  boxShadow: 8,
                  borderRadius: 4,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "background.paper",
                  color: "text.secondary",
                }}
              >
                <Dashboard sx={{ fontSize: 80, mb: 2, color: "primary.main" }} />
                <Typography variant="h5" component="h3">
                  Portfolio Dashboard
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          fontWeight="medium"
          sx={{ mb: 6 }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={3}>
              <Upload
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h5" component="h3" gutterBottom>
                Easy Import
              </Typography>
              <Typography>
                Import your investment data from various brokers with a simple
                CSV upload.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={3}>
              <TrendingUp
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h5" component="h3" gutterBottom>
                Performance Tracking
              </Typography>
              <Typography>
                Track your portfolio's performance over time with insightful
                metrics and charts.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={3}>
              <ShowChart
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h5" component="h3" gutterBottom>
                Analytics
              </Typography>
              <Typography>
                Analyze your investment strategy with powerful tools and
                visualizations.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={3}>
              <Security
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h5" component="h3" gutterBottom>
                Secure Storage
              </Typography>
              <Typography>
                Your data is securely stored and encrypted for your peace of
                mind.
              </Typography>
            </FeatureItem>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage; 
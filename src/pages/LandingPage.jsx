// src/pages/LandingPage.jsx
import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Avatar,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  TrendingUp,
  ShowChart,
  UploadFile,
  Security,
  ArrowForward,
  CheckCircleOutline,
  BarChart,
  AccountBalanceWallet,
  NotificationsActive,
} from "@mui/icons-material";
import { Fade, Slide } from "react-awesome-reveal";

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100px",
    background: theme.palette.background.default,
    clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 6),
  borderRadius: theme.shape.borderRadius * 5,
  fontWeight: 700,
  fontSize: "1.1rem",
  margin: theme.spacing(1),
  textTransform: "none",
  boxShadow: `0 4px 15px 0 ${alpha(theme.palette.common.black, 0.05)}`,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.common.black, 0.1)}`,
  },
}));

const FeatureItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.02)
      : theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition:
    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[theme.palette.mode === "dark" ? 6 : 10],
    borderColor: theme.palette.primary.main,
  },
}));

const FeatureIconWrapper = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginBottom: theme.spacing(2.5),
  "& .MuiSvgIcon-root": {
    fontSize: theme.spacing(4.5),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  fontWeight: "bold",
  color: theme.palette.text.primary,
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -theme.spacing(1.5),
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "4px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  },
}));

const HowItWorksStep = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  "& .MuiSvgIcon-root": {
    fontSize: theme.spacing(7),
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
}));

const CtaSection = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
  padding: theme.spacing(10, 0),
  textAlign: "center",
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(4, 2),
  textAlign: "center",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// --- LandingPage Component ---
const LandingPage = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <UploadFile />,
      title: "Seamless Import",
      description:
        "Easily import your investment data from various brokers via CSV or direct integration (coming soon).",
    },
    {
      icon: <TrendingUp />,
      title: "Performance Insights",
      description:
        "Track your portfolio's growth, ROI, and performance metrics with interactive charts.",
    },
    {
      icon: <ShowChart />,
      title: "Advanced Analytics",
      description:
        "Dive deep into your asset allocation, diversification, and risk exposure with powerful tools.",
    },
    {
      icon: <Security />,
      title: "Bank-Grade Security",
      description:
        "Your data is encrypted and securely stored, ensuring privacy and peace of mind.",
    },
  ];

  const howItWorksSteps = [
    {
      icon: <AccountBalanceWallet />,
      title: "Connect Your Accounts",
      description:
        "Link your brokerage accounts or upload your data in minutes.",
    },
    {
      icon: <BarChart />,
      title: "Visualize Your Portfolio",
      description:
        "See all your investments in one clear, consolidated dashboard.",
    },
    {
      icon: <NotificationsActive />,
      title: "Stay Informed",
      description:
        "Get insights, track goals, and make smarter investment decisions.",
    },
  ];

  return (
    <Box sx={{ overflowX: "hidden", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="left" triggerOnce>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  fontWeight="bold"
                  color="text.primary"
                  sx={{ mb: 2, lineHeight: 1.2 }}
                >
                  Your Financial Future,
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.secondary.light,
                      display: "block",
                    }}
                  >
                    Clearly Visualized.
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  color="text.secondary"
                  sx={{ mb: 4, opacity: 0.9 }}
                >
                  Take control of your investments. Monitor performance, analyze
                  strategies, and achieve your financial goals with our
                  intuitive platform.
                </Typography>
                <Box>
                  <HeroButton
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={RouterLink}
                    to="/signup"
                    endIcon={<ArrowForward />}
                  >
                    Get Started Free
                  </HeroButton>
                  <HeroButton
                    variant="outlined"
                    color="primary"
                    size="large"
                    component={RouterLink}
                    to="/login"
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.08
                        ),
                      },
                    }}
                  >
                    Sign In
                  </HeroButton>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="right" triggerOnce>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    mt: { xs: 4, md: 0 },
                  }}
                >
                  {/* Hero image/illustration goes here */}
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section (now using CSS Grid) */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Fade direction="up" triggerOnce>
            <SectionTitle variant="h3" component="h2" align="center">
              Unlock Powerful Investment Tools
            </SectionTitle>
          </Fade>

          <Box
            sx={{
              display: "grid",
              gap: 4,
              justifyContent: "center",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {features.map((feature, index) => (
              <Fade
                key={feature.title}
                direction="up"
                delay={index * 100}
                triggerOnce
              >
                <FeatureItem elevation={0}>
                  <FeatureIconWrapper>{feature.icon}</FeatureIconWrapper>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    fontWeight="medium"
                    color="text.primary"
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureItem>
              </Fade>
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Fade direction="up" triggerOnce>
            <SectionTitle variant="h3" component="h2" align="center">
              Get Started in 3 Simple Steps
            </SectionTitle>
          </Fade>
          <Grid container spacing={5} justifyContent="center">
            {howItWorksSteps.map((step, index) => (
              <Grid item xs={12} sm={4} key={step.title}>
                <Fade direction="up" delay={index * 150} triggerOnce>
                  <HowItWorksStep>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px auto",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </Box>
                    {step.icon}
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      fontWeight="medium"
                      color="text.primary"
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </HowItWorksStep>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ py: 10, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Fade direction="up" triggerOnce>
            <SectionTitle variant="h3" component="h2" align="center">
              Why Investors Trust Us
            </SectionTitle>
          </Fade>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade direction="left" triggerOnce>
                {/* Illustration */}
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade direction="right" triggerOnce>
                <List>
                  {[
                    {
                      icon: <CheckCircleOutline color="primary" />,
                      primary: "Holistic View",
                      secondary:
                        "Consolidate all your investments from different brokers into one comprehensive dashboard.",
                    },
                    {
                      icon: <CheckCircleOutline color="primary" />,
                      primary: "Actionable Insights",
                      secondary:
                        "Go beyond simple tracking with analytics that help you understand performance drivers.",
                    },
                    {
                      icon: <CheckCircleOutline color="primary" />,
                      primary: "User-Centric Design",
                      secondary:
                        "An intuitive and easy-to-navigate platform designed for investors of all levels.",
                    },
                    {
                      icon: <CheckCircleOutline color="primary" />,
                      primary: "Dedicated Support",
                      secondary:
                        "Our team is here to help you get the most out of our platform.",
                    },
                  ].map((item) => (
                    <ListItem key={item.primary} sx={{ py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primary}
                        secondary={item.secondary}
                        primaryTypographyProps={{
                          fontWeight: "medium",
                          color: "text.primary",
                        }}
                        secondaryTypographyProps={{
                          color: "text.secondary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 10, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Fade direction="up" triggerOnce>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight="bold"
              color="text.primary"
              align="center"
            >
              Ready to Elevate Your Investment Strategy?
            </Typography>
          </Fade>
          <Fade direction="up" delay={100} triggerOnce>
            <Typography
              variant="h6"
              color="text.secondary"
              paragraph
              align="center"
              sx={{ mb: 4 }}
            >
              Join thousands of investors who are making smarter decisions. Sign
              up today and take the first step towards financial clarity.
            </Typography>
          </Fade>
          <Fade direction="up" delay={200} triggerOnce>
            <Box sx={{ textAlign: "center" }}>
              <HeroButton
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/signup"
                endIcon={<ArrowForward />}
              >
                Start Tracking for Free
              </HeroButton>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Footer */}
      <Footer>
        <Container maxWidth="lg">
          <Typography variant="body2">
            © {new Date().getFullYear()} Your Investment Tracker. All rights
            reserved.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              component={RouterLink}
              to="/privacy"
              color="inherit"
              size="small"
              sx={{ textTransform: "none", mx: 1 }}
            >
              Privacy Policy
            </Button>
            <Button
              component={RouterLink}
              to="/terms"
              color="inherit"
              size="small"
              sx={{ textTransform: "none", mx: 1 }}
            >
              Terms of Service
            </Button>
          </Box>
        </Container>
      </Footer>
    </Box>
  );
};

export default LandingPage;

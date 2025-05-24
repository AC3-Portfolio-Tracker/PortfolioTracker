<<<<<<< HEAD
import React, { useState, useMemo } from "react";
=======
import React from "react";
>>>>>>> my-backup
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
<<<<<<< HEAD
  Box,
  Container,
=======
  Button,
  Box,
>>>>>>> my-backup
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
<<<<<<< HEAD
import { styled, alpha, useTheme } from "@mui/material/styles";

/* --------------------------------------------------------------
   Broker list – unchanged                                        
----------------------------------------------------------------*/
const brokersData = [
  {
    id: "180markets",
    name: "180 Markets",
    description: "Import CSV data",
    icon: AccountBalanceIcon,
    iconColor: "primary.main",
  },
  {
    id: "708wealth",
    name: "708 Wealth",
    description: "Wealth Management",
    icon: BusinessIcon,
    iconColor: "secondary.main",
  },
  {
    id: "alpine",
    name: "Alpine Capital",
    description: "Investment Services",
    icon: CorporateFareIcon,
    iconColor: "info.main",
  },
  {
    id: "asr",
    name: "ASR Wealth",
    description: "Wealth Advisers",
    icon: BusinessIcon,
    iconColor: "success.main",
  },
  {
    id: "hsbc",
    name: "HSBC",
    description: "Australia",
    icon: AccountBalanceIcon,
    iconColor: "error.main",
  },
  {
    id: "stake",
    name: "Stake",
    description: "Australia",
    icon: AccountBalanceIcon,
    iconColor: "warning.main",
  },
  {
    id: "superhero",
    name: "Superhero",
    description: "Australia",
    icon: CorporateFareIcon,
    iconColor: "primary.dark",
  },
  {
    id: "commsec",
    name: "CommSec",
    description: "Australia",
    icon: AccountBalanceIcon,
    iconColor: "info.dark",
  },
  {
    id: "nabtrade",
    name: "NAB Trade",
    description: "Australia",
    icon: BusinessIcon,
    iconColor: "secondary.dark",
  },
  {
    id: "etoro",
    name: "eToro",
    description: "Australia",
    icon: AccountBalanceIcon,
    iconColor: "success.dark",
  },
  {
    id: "moomoo",
    name: "Moomoo",
    description: "Australia",
    icon: CorporateFareIcon,
    iconColor: "error.dark",
  },
];

/* --------------------------------------------------------------
   Pill‑style card                                                
----------------------------------------------------------------*/
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "none",
  transition: "transform .15s ease, box-shadow .15s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[3],
    backgroundColor: alpha(
      theme.palette.action.hover,
      theme.palette.mode === "dark" ? 0.08 : 0.04
    ),
  },
}));

/* --------------------------------------------------------------
   Component                                                      
----------------------------------------------------------------*/
function Broker() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("az");

  const brokers = useMemo(() => {
    return brokersData
      .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "az") return a.name.localeCompare(b.name);
        if (sortBy === "za") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [search, sortBy]);

  const handleOpen = (id) => navigate(`/brokers/${id}`);

  return (
    <Box sx={{ py: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        {/* 🧭 Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Home
          </Link>
          <Typography color="text.primary">Brokers</Typography>
        </Breadcrumbs>

        {/* 🏷️ Headings */}
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Select Your Broker
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          Choose a supported broker to import your transactions and start
          tracking.
        </Typography>

        {/* 🔍 Search */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for your broker…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {/* 🔄 Sort + count */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {brokers.length} of {brokersData.length} brokers
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Sort by:
            </Typography>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="az">Name: A – Z</MenuItem>
              <MenuItem value="za">Name: Z – A</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* 🎨 Brokers grid – exactly 3 per row, last row centred */}
        <Grid container spacing={3} justifyContent="center">
          {brokers.map((b) => {
            const Icon = b.icon;
            return (
              // MODIFIED LINE: Changed xs from 12 to 4
              <Grid item xs={4} sm={4} md={4} lg={4} key={b.id}>
                <StyledCard
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${b.name}`}
                  onClick={() => handleOpen(b.id)}
                  onKeyDown={(e) => e.key === "Enter" && handleOpen(b.id)}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 3,
                      gap: 1.25,
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 48,
                        color: b.iconColor || theme.palette.primary.main,
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      align="center"
                      fontWeight={500}
                    >
                      {b.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      align="center"
                      color="text.secondary"
                    >
                      {b.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            );
          })}
        </Grid>

        {/* 🚫 Empty state */}
        {brokers.length === 0 && (
          <Typography
            sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}
          >
            No brokers found{search && ` matching “${search}”`}.
          </Typography>
        )}
      </Container>
    </Box>
=======
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

function Broker() {
  const navigate = useNavigate();

  const handleBrokerClick = (brokerId) => {
    navigate(`/brokers/${brokerId}`);
  };

  return (
    <div className="broker-upload-page">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, color: "text.secondary" }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">Brokers</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Import from Brokers
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
        Select one of our supported brokers to import your transactions.
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for your broker by name..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          color: "text.secondary",
        }}
      >
        <Typography variant="body2">Showing 5 brokers</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Sort by:
          </Typography>
          <Select value="az" variant="outlined" size="small">
            <MenuItem value="az">A - Z</MenuItem>
            <MenuItem value="za">Z - A</MenuItem>
          </Select>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {/* 180 Markets */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard onClick={() => handleBrokerClick("180markets")}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
                padding: 3,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
              <Typography variant="h6" align="center" color="text.primary">
                180 Markets
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                Import CSV data
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* 708 Wealth Management */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard onClick={() => handleBrokerClick("708wealth")}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
                padding: 3,
              }}
            >
              <BusinessIcon sx={{ fontSize: 40, color: "secondary.main", mb: 1 }} />
              <Typography variant="h6" align="center" color="text.primary">
                708 Wealth
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                Wealth Management
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Alpine Capital */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard onClick={() => handleBrokerClick("alpine")}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
                padding: 3,
              }}
            >
              <CorporateFareIcon sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
              <Typography variant="h6" align="center" color="text.primary">
                Alpine Capital
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                Investment Services
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* ASR Wealth Advisers */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard onClick={() => handleBrokerClick("asr")}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
                padding: 3,
              }}
            >
              <BusinessIcon sx={{ fontSize: 40, color: "success.main", mb: 1 }} />
              <Typography variant="h6" align="center" color="text.primary">
                ASR Wealth
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                Wealth Advisers
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* HSBC */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard onClick={() => handleBrokerClick("hsbc")}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
                padding: 3,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 40, color: "error.main", mb: 1 }} />
              <Typography variant="h6" align="center" color="text.primary">
                HSBC
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                Australia
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
>>>>>>> my-backup
  );
}

export default Broker;

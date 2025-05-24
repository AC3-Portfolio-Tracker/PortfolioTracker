import React from "react";
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
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
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
  );
}

export default Broker;

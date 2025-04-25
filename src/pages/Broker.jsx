import React from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

function Broker() {
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
        <Typography color="text.secondary">Add Investment</Typography>
        <Typography color="text.primary">Upload via broker</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Upload via broker
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
        Search and choose one of our supported brokers to begin.{" "}
        <Link href="#" color="primary">
          Learn more
        </Link>
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          color: "text.secondary",
        }}
      >
        <Typography variant="body2">Showing 127 of 244</Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Sort by:
          </Typography>
          <Select value="az" variant="outlined" size="small">
            <MenuItem value="az">A - Z</MenuItem>
            {/* Add other sorting options */}
          </Select>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <img
                src="https://via.placeholder.com/150/ffffff/000000?Text=180MARKETS"
                alt="180MARKETS"
                style={{
                  maxWidth: "100%",
                  maxHeight: 80,
                  objectFit: "contain",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <Typography variant="h6" color="text.primary">
                708{" "}
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ display: "block", fontSize: "0.8rem" }}
                >
                  WEALTH MANAGEMENT
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <Typography variant="h6" color="text.primary">
                <Typography component="span" color="warning">
                  ACUMEN
                </Typography>{" "}
                <Typography component="span" color="text.secondary" sx={{}}>
                  INVESTORS
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <img
                src="https://via.placeholder.com/100/ffcc00/000000?Text=Alpaca"
                alt="Alpaca"
                style={{
                  borderRadius: "50%",
                  maxWidth: "80%",
                  maxHeight: 80,
                  objectFit: "contain",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <img
                src="https://via.placeholder.com/120/f0ad4e/ffffff?Text=ALPINE%20CAPITAL&style=round"
                alt="ALPINE CAPITAL"
                style={{
                  borderRadius: "5px",
                  maxWidth: "90%",
                  maxHeight: 80,
                  objectFit: "contain",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <Typography variant="h6" color="text.primary">
                ALTO{" "}
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ display: "block", fontSize: "0.8rem" }}
                >
                  CAPITAL
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <Typography variant="h6" style={{ color: "#a94442" }}>
                Amscot
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <Typography variant="h6" style={{ color: "#007bff" }}>
                ANZ{" "}
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ display: "block", fontSize: "0.7rem" }}
                >
                  Share Investing
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more broker cards here */}
      </Grid>
    </div>
  );
}

export default Broker;

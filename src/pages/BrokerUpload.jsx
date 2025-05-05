import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Breadcrumbs,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, HomeOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import BrokerCSVUploader from "../components/BrokerCSVUploader";
import { supabase } from "../lib/supabase";
import TransactionTable from "../components/TransactionTable";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[2],
  transition: "box-shadow 0.3s ease-in-out",
  marginBottom: theme.spacing(3),
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

// Map broker params to display names
const brokerNameMap = {
  "180markets": "180 Markets",
  "708wealth": "708 Wealth Management",
  "alpine": "Alpine Capital",
  "asr": "ASR Wealth Advisers",
  "hsbc": "HSBC Australia"
};

const BrokerUpload = () => {
  const { brokerId } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  // Get broker display name
  const brokerName = brokerNameMap[brokerId] || brokerId;

  // Load transactions from the database for this broker
  const loadTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      // First get the broker ID
      const { data: brokerData, error: brokerError } = await supabase
        .from("brokers")
        .select("id")
        .ilike("name", `%${brokerName}%`)
        .single();
      
      if (brokerError) {
        // Broker not found, but we'll just show empty transactions
        setTransactions([]);
        setIsLoadingTransactions(false);
        return;
      }

      // Now get transactions for this broker
      const { data, error } = await supabase
        .from("activities")
        .select(`
          *,
          securities:security_id (
            symbol,
            name,
            exchange,
            currency
          )
        `)
        .eq("broker_id", brokerData.id)
        .order("date", { ascending: false });

      if (error) throw error;
      
      // Format the transactions for display
      const formattedTransactions = data.map(tx => ({
        id: tx.id,
        type: tx.type,
        date: new Date(tx.date).toLocaleDateString(),
        market: tx.securities?.exchange || "",
        code: tx.securities?.symbol || "",
        securityName: tx.securities?.name || tx.securities?.symbol || "",
        quantity: tx.quantity,
        price: tx.price,
        brokerage: tx.fees,
        currency: tx.currency,
        totalAmount: tx.total_amount,
        broker: brokerName,
        notes: tx.notes,
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Error loading transactions:", error);
      setNotification({
        open: true,
        message: `Error loading transactions: ${error.message}`,
        severity: "error",
      });
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  // Load transactions on component mount
  useEffect(() => {
    loadTransactions();
  }, [brokerId]);

  const handleUploadComplete = (data) => {
    setNotification({
      open: true,
      message: `Successfully imported ${data.length} transactions from ${brokerName}`,
      severity: "success",
    });
    
    // Refresh the transactions list
    loadTransactions();
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", transactionId);

      if (error) throw error;

      setNotification({
        open: true,
        message: "Transaction deleted successfully",
        severity: "success",
      });
      
      // Refresh the transactions list
      loadTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setNotification({
        open: true,
        message: `Error deleting transaction: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          to="/"
          style={{ 
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          <HomeOutlined sx={{ mr: 0.5 }} fontSize="small" />
          Home
        </Link>
        <Link 
          to="/brokers"
          style={{ 
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          Brokers
        </Link>
        <Typography color="text.primary">{brokerName}</Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/brokers")}
          sx={{ mr: 3 }}
        >
          Back to Brokers
        </Button>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
        >
          {brokerName} Transactions
        </Typography>
      </Box>

      <StyledPaper sx={{ mb: 4 }}>
        <BrokerCSVUploader 
          onUploadComplete={handleUploadComplete} 
          brokerName={brokerName} 
        />
      </StyledPaper>

      <Typography variant="h5" component="h2" gutterBottom>
        Existing Transactions
      </Typography>

      <StyledPaper>
        {isLoadingTransactions ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : transactions.length > 0 ? (
          <TransactionTable 
            transactions={transactions} 
            onDelete={handleDeleteTransaction}
          />
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No transactions from {brokerName} found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Import transactions using the uploader above to get started
            </Typography>
          </Box>
        )}
      </StyledPaper>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BrokerUpload; 
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { ArrowBack, HomeOutlined, DeleteOutline } from "@mui/icons-material";
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  // Handle confirmation dialog opening
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  // Handle confirmation dialog closing
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // Handle delete all broker data
  const handleDeleteAllBrokerData = async () => {
    setIsDeleting(true);
    try {
      // First get the broker ID
      const { data: brokerData, error: brokerError } = await supabase
        .from("brokers")
        .select("id")
        .ilike("name", `%${brokerName}%`)
        .single();
      
      if (brokerError) {
        throw brokerError;
      }

      // Delete all activities associated with this broker
      const { error: deleteError } = await supabase
        .from("activities")
        .delete()
        .eq("broker_id", brokerData.id);

      if (deleteError) throw deleteError;
      
      setNotification({
        open: true,
        message: `Successfully deleted all transactions from ${brokerName}`,
        severity: "success",
      });
      
      // Refresh the transactions list
      setTransactions([]);
    } catch (error) {
      console.error("Error deleting broker data:", error);
      setNotification({
        open: true,
        message: `Error deleting transactions: ${error.message}`,
        severity: "error",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
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

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Existing Transactions
        </Typography>
        
        {transactions.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutline />}
            onClick={handleOpenDeleteDialog}
            disabled={isDeleting}
          >
            Delete All {brokerName} Data
          </Button>
        )}
      </Box>

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

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>
          Delete All {brokerName} Data
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all transactions from {brokerName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDeleteDialog} 
            color="primary"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAllBrokerData} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete All"}
          </Button>
        </DialogActions>
      </Dialog>

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
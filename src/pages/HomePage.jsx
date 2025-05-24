import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
  Button,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Add, UploadFile, Refresh, DeleteOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import EnhancedCSVUploader from "../components/EnhancedCSVUploader";
import { supabase } from "../lib/supabase";
import TransactionTable from "../components/TransactionTable";
import AddTransactionForm from "../components/AddTransactionForm";

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

const HomePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Load transactions from the database
  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select(`
          *,
          securities:security_id (
            symbol,
            name,
            exchange,
            currency
          ),
          brokers:broker_id (
            name
          )
        `)
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
        broker: tx.brokers?.name || "",
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
      // Re-throw the error so it can be caught in the useEffect
      throw error;
    }
  };

  // Load transactions on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingTransactions(true);
      try {
        await loadTransactions();
      } catch (error) {
        console.error("Error in initial data loading:", error);
        // Make sure loading state is turned off even if there's an error
        setNotification({
          open: true,
          message: `Error loading data: ${error.message}`,
          severity: "error",
        });
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    fetchData();
    
    // Clean up function to prevent state updates after unmount
    return () => {
      // This ensures we don't try to update state after component unmount
    };
  }, []);

  const handleUploadComplete = (data) => {
    setNotification({
      open: true,
      message: `Successfully imported ${data.length} transactions`,
      severity: "success",
    });
    
    // Refresh the transactions list
    loadTransactions();
    
    // Reset the UI
    setIsUploading(false);
    setTabValue(0); // Switch back to the transactions tab
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      // First ensure the security exists or create it
      const { data: securityData, error: securityError } = await supabase
        .from("securities")
        .select("id")
        .eq("symbol", newTransaction.code)
        .eq("exchange", newTransaction.market)
        .single();

      let securityId;

      if (securityError || !securityData) {
        // Create the security
        const { data: newSecurity, error: createSecurityError } = await supabase
          .from("securities")
          .insert({
            symbol: newTransaction.code,
            name: newTransaction.securityName || newTransaction.code,
            asset_class: newTransaction.assetClass || "Equity",
            currency: newTransaction.currency,
            exchange: newTransaction.market,
          })
          .select("id")
          .single();

        if (createSecurityError) {
          throw new Error(`Error creating security: ${createSecurityError.message}`);
        }
        
        securityId = newSecurity.id;
      } else {
        securityId = securityData.id;
      }

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Create the activity
      const { error: activityError } = await supabase
        .from("activities")
        .insert({
          user_id: user.id,
          security_id: securityId,
          broker_id: newTransaction.brokerId || null,
          type: newTransaction.type,
          date: newTransaction.date,
          quantity: newTransaction.quantity,
          price: newTransaction.price,
          total_amount: newTransaction.type === "Dividend" 
            ? newTransaction.price 
            : (newTransaction.price * newTransaction.quantity) + (newTransaction.brokerage || 0),
          fees: newTransaction.brokerage,
          currency: newTransaction.currency,
          notes: newTransaction.notes,
        });

      if (activityError) {
        throw new Error(`Error recording activity: ${activityError.message}`);
      }

      setNotification({
        open: true,
        message: "Transaction added successfully",
        severity: "success",
      });

      // Refresh transactions and reset form
      loadTransactions();
      setShowAddForm(false);
      
    } catch (err) {
      console.error("Error adding transaction:", err);
      setNotification({
        open: true,
        message: `Error adding transaction: ${err.message}`,
        severity: "error",
      });
    }
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

  // Handle confirmation dialog opening
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  // Handle confirmation dialog closing
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // Handle delete all data
  const handleDeleteAllData = async () => {
    setIsDeleting(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Delete all activities for the current user
      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
      
      setNotification({
        open: true,
        message: "Successfully deleted all your transaction data",
        severity: "success",
      });
      
      // Clear the transactions list
      setTransactions([]);
    } catch (error) {
      console.error("Error deleting all data:", error);
      setNotification({
        open: true,
        message: `Error deleting data: ${error.message}`,
        severity: "error",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Portfolio Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="portfolio tabs">
          <Tab label="Transactions" />
          <Tab label="Import" />
        </Tabs>
      </Box>

      {/* Transactions Tab */}
      {tabValue === 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" component="h2">
              Transactions
            </Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={loadTransactions}
                sx={{ mr: 2 }}
                disabled={isLoadingTransactions}
              >
                Refresh
              </Button>
              {transactions.length > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutline />}
                  onClick={handleOpenDeleteDialog}
                  sx={{ mr: 2 }}
                  disabled={isDeleting}
                >
                  Delete All
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setShowAddForm(true)}
              >
                Add Transaction
              </Button>
            </Box>
          </Box>

          {showAddForm && (
            <StyledPaper sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add New Transaction
              </Typography>
              <AddTransactionForm
                onSubmit={handleAddTransaction}
                onCancel={() => setShowAddForm(false)}
              />
            </StyledPaper>
          )}

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
                  No transactions found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Import transactions or add them manually to get started
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<UploadFile />}
                  onClick={() => setTabValue(1)}
                  sx={{ mr: 2 }}
                >
                  Import CSV
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => setShowAddForm(true)}
                >
                  Add Manually
                </Button>
              </Box>
            )}
          </StyledPaper>
        </>
      )}

      {/* Import Tab */}
      {tabValue === 1 && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            Import Transactions
          </Typography>
          <Typography variant="body1" paragraph>
            Upload a CSV file to import your transactions. We support multiple broker formats including:
            <ul>
              <li>Sharesight Format</li>
              <li>180 Markets</li>
              <li>708 Wealth Management</li>
              <li>Alpine Capital</li>
              <li>ASR Wealth Advisers</li>
              <li>HSBC Australia</li>
            </ul>
            Select your broker format from the dropdown and upload your CSV file.
          </Typography>
          <EnhancedCSVUploader onUploadComplete={handleUploadComplete} />
        </>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>
          Delete All Transaction Data
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete ALL of your transaction data? This will remove all transactions across all brokers and cannot be undone.
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
            onClick={handleDeleteAllData} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Everything"}
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

export default HomePage; 
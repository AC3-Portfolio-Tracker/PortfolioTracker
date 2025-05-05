import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Block as BlockIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [configurations, setConfigurations] = useState({
    defaultCurrency: 'AUD',
    enableCGT: true,
    freeUserUploadLimit: 100,
    premiumUserUploadLimit: 1000,
    defaultTheme: 'light',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [deleteUserDialog, setDeleteUserDialog] = useState({
    open: false,
    userId: null,
    email: ''
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Load users
  const loadUsers = async () => {
    setLoading(true);
    try {
      // Get profiles from the profiles table
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      
      // Transform the data to include account type
      const usersWithRoles = profilesData.map(profile => {
        // In a production app, you would check user metadata for role
        // For now, use a default role
        return {
          ...profile,
          role: profile.is_admin ? 'admin' : 'authenticated',
          accountType: profile.account_type || 'free'
        };
      });
      
      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error loading users:', error);
      showNotification(`Error loading users: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Load system configurations
  const loadConfigurations = async () => {
    // In a real app, you'd fetch these from your database
    // This is just a placeholder with hardcoded values
    setConfigurations({
      defaultCurrency: 'AUD',
      enableCGT: true,
      freeUserUploadLimit: 100,
      premiumUserUploadLimit: 1000,
      defaultTheme: 'light',
    });
  };

  useEffect(() => {
    loadUsers();
    loadConfigurations();
  }, []);

  // Update to use metadata instead of PostgreSQL roles
  const handleUpdateUserRole = async (userId, newRole) => {
    setLoading(true);
    try {
      // Update profile table with is_admin flag
      const isAdmin = newRole === 'admin';
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Update the UI
      setUsers(users.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              role: newRole, 
              is_admin: isAdmin
            } 
          : user
      ));
      
      showNotification(`User role updated to ${newRole}`, 'success');
    } catch (error) {
      console.error('Error updating user role:', error);
      showNotification(`Error updating user role: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccountType = async (userId, newType) => {
    setLoading(true);
    try {
      // Update profile with new account type (free vs premium)
      const { error } = await supabase
        .from('profiles')
        .update({ account_type: newType })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Update UI
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, account_type: newType } 
          : user
      ));
      
      showNotification(`Account type updated to ${newType}`, 'success');
    } catch (error) {
      console.error('Error updating account type:', error);
      showNotification(`Error updating account type: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateUser = async (userId) => {
    setLoading(true);
    try {
      // In a real app, you would call a secure backend function 
      // Here we're updating the UI only for demonstration
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, is_active: false } 
          : user
      ));
      
      showNotification(`User deactivated successfully`, 'success');
    } catch (error) {
      console.error('Error deactivating user:', error);
      showNotification(`Error deactivating user: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (userId, email) => {
    setDeleteUserDialog({
      open: true,
      userId,
      email
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteUserDialog({
      open: false,
      userId: null,
      email: ''
    });
  };

  const handleDeleteUser = async () => {
    if (!deleteUserDialog.userId) return;
    
    setLoading(true);
    try {
      // In a real app, you would call a secure backend function
      // that has administrative privileges to delete users
      // Here we're just updating the UI
      
      setUsers(users.filter(user => user.id !== deleteUserDialog.userId));
      showNotification(`User deleted successfully`, 'success');
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification(`Error deleting user: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfigurations = async () => {
    setLoading(true);
    try {
      // In a real app, you would save these to your database
      // This is just a placeholder
      showNotification('System settings updated successfully', 'success');
    } catch (error) {
      console.error('Error saving configurations:', error);
      showNotification(`Error saving configurations: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="admin dashboard tabs">
          <Tab label="User Management" />
          <Tab label="System Configuration" />
        </Tabs>
      </Box>
      
      {/* User Management Tab */}
      {activeTab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              User Management
            </Typography>
            <Button 
              startIcon={<RefreshIcon />} 
              variant="outlined" 
              onClick={loadUsers}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.first_name} {user.last_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={user.account_type || 'free'}
                          size="small"
                          onChange={(e) => handleUpdateAccountType(user.id, e.target.value)}
                        >
                          <MenuItem value="free">Free</MenuItem>
                          <MenuItem value="premium">Premium</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.role || 'authenticated'}
                          size="small"
                          onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                        >
                          <MenuItem value="authenticated">Regular</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {user.is_active === false ? (
                          <Typography color="error">Inactive</Typography>
                        ) : (
                          <Typography color="success">Active</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="warning" 
                          onClick={() => handleDeactivateUser(user.id)}
                          disabled={user.is_active === false}
                          title="Deactivate User"
                        >
                          <BlockIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleOpenDeleteDialog(user.id, user.email)}
                          title="Delete User"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      
      {/* System Configuration Tab */}
      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            System Configuration
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Currency & Financial Settings
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="default-currency-label">Default Currency</InputLabel>
                  <Select
                    labelId="default-currency-label"
                    value={configurations.defaultCurrency}
                    label="Default Currency"
                    onChange={(e) => setConfigurations({...configurations, defaultCurrency: e.target.value})}
                  >
                    <MenuItem value="USD">US Dollar (USD)</MenuItem>
                    <MenuItem value="AUD">Australian Dollar (AUD)</MenuItem>
                    <MenuItem value="EUR">Euro (EUR)</MenuItem>
                    <MenuItem value="GBP">British Pound (GBP)</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={configurations.enableCGT}
                      onChange={(e) => setConfigurations({...configurations, enableCGT: e.target.checked})}
                    />
                  }
                  label="Enable Capital Gains Tax (CGT) Calculation"
                />
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Limits
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Free User Upload Limit"
                  type="number"
                  value={configurations.freeUserUploadLimit}
                  onChange={(e) => setConfigurations({...configurations, freeUserUploadLimit: parseInt(e.target.value)})}
                  fullWidth
                  helperText="Maximum number of transactions a free user can upload"
                />
                
                <TextField
                  label="Premium User Upload Limit"
                  type="number"
                  value={configurations.premiumUserUploadLimit}
                  onChange={(e) => setConfigurations({...configurations, premiumUserUploadLimit: parseInt(e.target.value)})}
                  fullWidth
                  helperText="Maximum number of transactions a premium user can upload"
                />
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Display Settings
              </Typography>
              
              <FormControl fullWidth>
                <InputLabel id="default-theme-label">Default Theme</InputLabel>
                <Select
                  labelId="default-theme-label"
                  value={configurations.defaultTheme}
                  label="Default Theme"
                  onChange={(e) => setConfigurations({...configurations, defaultTheme: e.target.value})}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSaveConfigurations}
              disabled={loading}
            >
              Save Configuration
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Delete User Confirmation Dialog */}
      <Dialog
        open={deleteUserDialog.open}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user <strong>{deleteUserDialog.email}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminDashboard; 
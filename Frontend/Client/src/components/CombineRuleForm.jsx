import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

const CombineRuleForm = ({ onRuleCombined }) => {
  const [description1, setdescription1] = useState('');
  const [description2, setdescription2] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For success feedback
  const [errorMessage, setErrorMessage] = useState(''); // For error feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/rules/combine', {
        description1,
        description2,
        newDescription,
      });
      console.log(response.data);
      onRuleCombined(response.data);
      setdescription1('');
      setdescription2('');
      setNewDescription('');
      setErrorMessage(''); // Clear any previous errors
      setSuccessMessage('Rules combined successfully!'); // Set success message
    } catch (error) {
      console.error('Error combining rules:', error);
      setSuccessMessage(''); // Clear previous success messages
      setErrorMessage('Failed to combine rules. Please try again.'); // Set error message
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 4,
        maxWidth: '100%',
        width: { xs: '100%', sm: '100%', md: '400px' },
        bgcolor: 'background.paper',
        boxShadow: 4,
        borderRadius: 3,
        margin: 'auto',
        mt: 4,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 8,
        },
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Combine Rules
      </Typography>
      
      {/* Success Alert */}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      
      {/* Error Alert */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="First Rule String"
        variant="outlined"
        value={description1}
        onChange={(e) => setdescription1(e.target.value)}
        fullWidth
        required
        sx={{ bgcolor: 'background.default', borderRadius: 1 }}
      />
      <TextField
        label="Second Rule String"
        variant="outlined"
        value={description2}
        onChange={(e) => setdescription2(e.target.value)}
        fullWidth
        required
        sx={{ bgcolor: 'background.default', borderRadius: 1 }}
      />
      <TextField
        label="New Description"
        variant="outlined"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        fullWidth
        required
        sx={{ bgcolor: 'background.default', borderRadius: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{
          py: 1.5,
          fontSize: '1rem',
          borderRadius: 2,
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        Combine Rules
      </Button>
    </Box>
  );
};

export default CombineRuleForm;

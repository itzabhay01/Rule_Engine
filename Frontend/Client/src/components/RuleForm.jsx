import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

const RuleForm = ({ onRuleCreated }) => {
  const [ruleString, setRuleString] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For success feedback
  const [errorMessage, setErrorMessage] = useState(''); // For error feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/rules/', { ruleString, description });
      onRuleCreated(response.data.rule);
      setRuleString('');
      setDescription('');
      setSuccessMessage('Rule created successfully!'); // Set success message
      setErrorMessage(''); // Clear any previous errors
    } catch (error) {
      console.error('Error creating rule:', error);
      setSuccessMessage(''); // Clear previous success messages
      setErrorMessage('Failed to create rule. Please try again.'); // Set error message
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
        transition: '0.3s',
        '&:hover': {
          boxShadow: 8,
        },
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create a New Rule
      </Typography>
      
      {/* Success Alert */}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      
      {/* Error Alert */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Rule String"
        variant="outlined"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        fullWidth
        required
        sx={{
          borderRadius: 1,
          bgcolor: 'background.default',
          '& .MuiOutlinedInput-root:hover': {
            borderColor: 'primary.main',
          },
        }}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        sx={{
          borderRadius: 1,
          bgcolor: 'background.default',
        }}
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
        Create Rule
      </Button>
    </Box>
  );
};

export default RuleForm;

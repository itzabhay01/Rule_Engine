import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

const UserEvaluationForm = () => {
  const [userData, setUserData] = useState({
    age: '',
    salary: '',
    experience: '',
    department: '',
  });
  const [description, setDescription] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/rules/evaluate', {
        description,
        userData,
      });
      setEvaluationResult(response.data.result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
    }
    // console.log(e);
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
      <Typography variant="h5" align="center" gutterBottom>Evaluate User Data</Typography>
      <TextField
        label="Age"
        name="age"
        value={userData.age}
        onChange={handleInputChange}
        fullWidth
        required
        sx={{ bgcolor: 'background.default', borderRadius: 1 }}
      />
      <TextField
        label="Salary"
        name="salary"
        value={userData.salary}
        onChange={handleInputChange}
        fullWidth
        required
        sx={{ bgcolor: 'background.default', borderRadius: 1 }}
      />
      <TextField
        label="Experience"
        name="experience"
        value={userData.experience}
        onChange={handleInputChange}
        fullWidth
        required
        sx={{ bgcolor: 'background.default', borderRadius: 1 }}
      />
      <TextField
        label="Department"
        name="department"
        value={userData.department}
        onChange={handleInputChange}
        fullWidth
        required
        sx={{ bgcolor: 'background.default', borderRadius: 1 }}
      />
      <TextField
        label="Rule Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        Evaluate
      </Button>
      {evaluationResult !== null && (
        <Alert severity={evaluationResult ? 'success' : 'error'} sx={{ mt: 2 }}>
          {evaluationResult ? 'Rule Passed' : 'Rule Failed'}
        </Alert>
      )}
    </Box>
  );
};

export default UserEvaluationForm;

import React from 'react';
import { Grid, Box } from '@mui/material';
import UserEvaluationForm from '../components/EvaluateForm';
import RuleList from '../components/RuleList';

const EvaluatePage = ({ rules }) => {
  return (
    <Grid container spacing={4}>
      {/* Left Section: User Evaluation Form */}
      <Grid item xs={12} md={6}>
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 2 }}>
          <UserEvaluationForm />
        </Box>
      </Grid>
      
      {/* Right Section: Rule List */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            borderLeft: '1px solid #e0e0e0', // Adding partition
            height: '100%', // To make the box stretch the full height
          }}
        >
          <RuleList rules={rules} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default EvaluatePage;

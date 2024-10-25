import React from 'react';
import { Grid, Box } from '@mui/material';
import RuleForm from '../components/RuleForm';
import CombineRuleForm from '../components/CombineRuleForm';
import RuleList from '../components/RuleList';

const HomePage = ({ onRuleCreated, onRuleCombined }) => {
  return (
    <Grid container spacing={4}>
      {/* Left Section: Rule Form and Combine Rule Form */}
      <Grid item xs={12} md={6}>
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <RuleForm onRuleCreated={onRuleCreated} />
          <CombineRuleForm onRuleCombined={onRuleCombined} />
        </Box>
      </Grid>

      {/* Right Section: Rule List */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 2,
            boxShadow: 1,
            borderLeft: '1px solid #e0e0e0', // Optional partition
          }}
        >
          <RuleList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;

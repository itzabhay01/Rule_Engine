import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

const RuleList = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('/rules/');
        console.log('API Response:', response); // Log full API response
        console.log('Rules Data:', response.data); // Log specific rules data
        setRules(response.data|| []); // Set rules or empty array if undefined
      } catch (error) {
        setError('Error fetching rules'); // Capture any error
        console.error('Error fetching rules:', error); // Log any error
      } finally {
        setLoading(false); // Turn off loading spinner
      }
    };
    fetchRules();
  }, []);

  // If still loading, show a loading message
  if (loading) {
    return <Typography>Loading rules...</Typography>;
  }

  // If there's an error, display the error message
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: '100%',
        width: { xs: '100%', sm: '100%', md: '400px' },
        bgcolor: 'background.paper',
        boxShadow: 4,
        borderRadius: 3,
        margin: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">Rules List</Typography>
      <List sx={{ width: '100%' }}>
        {rules.length === 0 ? (
          <Typography>No rules found</Typography> // Show message if no rules exist
        ) : (
          rules.map((rule, index) => (
            <ListItem
              key={index}
              divider
              sx={{
                borderBottom: '1px solid #e0e0e0',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemText
                primary={rule.description}
                secondary={rule.ruleString}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
                secondaryTypographyProps={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default RuleList;

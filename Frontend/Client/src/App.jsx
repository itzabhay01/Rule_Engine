// import React, { useState } from 'react';
// import { Grid, Container } from '@mui/material';
// import RuleForm from './components/RuleForm';
// import RuleList from './components/RuleList';
// import CombineRuleForm from './components/CombineRuleForm';
// import UserEvaluationForm from './components/EvaluateForm';


// const App = () => {
//   const [rules, setRules] = useState([]);

//   const handleRuleCreated = (newRule) => {
//     setRules([...rules, newRule]);
//   };

//   const handleRuleCombined = (combinedRule) => {
//     setRules([...rules, combinedRule]);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ my: 4 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <RuleForm onRuleCreated={handleRuleCreated} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <RuleList />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <CombineRuleForm onRuleCombined={handleRuleCombined} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <UserEvaluationForm />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {  Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

import axios from 'axios';
import Home from './pages/Home';
import Evaluate from './pages/Evaluate';

axios.defaults.baseURL = 'http://localhost:3000';

const App = () => {
  const [rules, setRules] = useState([]);

  const handleRuleCreated = (newRule) => {
    setRules((prevRules) => [...prevRules, newRule]);
  };

  const handleRuleCombined = (combinedRule) => {
    setRules((prevRules) => [...prevRules, combinedRule]);
  };

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('/rules/');
        setRules(response.data || []);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };
    fetchRules();
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rule Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/evaluate">
            Evaluate
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Routes>
          <Route 
            path="/" 
            element={<Home rules={rules} onRuleCreated={handleRuleCreated} onRuleCombined={handleRuleCombined} />} 
          />
          <Route 
            path="/evaluate" 
            element={<Evaluate rules={rules} />} 
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

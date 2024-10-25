const express = require('express');
const rulesController = require('../controller/rules.js');
const { conversion } = require('../middlewares/Conversion.js');
const { retrieveASTByRuleString } = require('../middlewares/Retrieve.js');
const { combineASTs } = require('../middlewares/Combine.js');

const router = express.Router();

router
// .get('/test', (req, res) => {
//     res.send('Test route works');
//   })
    .get('/',rulesController.getAllRule)
    .post('/',conversion,rulesController.createRule)
    .post('/combine', retrieveASTByRuleString, combineASTs, rulesController.combineRule)
    .post('/evaluate',rulesController.evaluateRule)
    

exports.router= router
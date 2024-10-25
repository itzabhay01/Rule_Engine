const mongoose = require('mongoose')
const model= require('../model/rules')
const Rule= model.Rule;
exports.retrieveASTByRuleString = async (req, res, next) => {
  const { description1, description2 } = req.body;
  
  try {
    const rule1 = await Rule.findOne({ description: description1 });
    const rule2 = await Rule.findOne({ description: description2 });


    if (!rule1 || !rule2) {
      return res.status(404).json({ error: 'One or both rules not found using ruleString' });
    }

    // Attach the retrieved ASTs and ruleStrings to the request object
    req.rule1AST = rule1.ast;
    req.rule2AST = rule2.ast;
    req.rule1String = rule1.ruleString;
    req.rule2String = rule2.ruleString;

    console.log(req.body);

    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(400).send({ error: 'Invalid ruleString format' });
  }
};

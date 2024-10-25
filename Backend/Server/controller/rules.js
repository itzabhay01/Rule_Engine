const mongoose = require('mongoose')
const model= require('../model/rules')
const Rule= model.Rule;

exports.createRule=(req,res)=>{
    
    const rule= new Rule(req.body);
    rule.save()
    .then(doc=>{
        res.status(201).json(doc);
    })
    .catch(err=>{
        console.error(err);
        res.status(500).json(err);
    });
}

exports.combineRule = (req, res) => {
    console.log('Request received at controller /rules/combine:', req.body);
    
    const { newDescription } = req.body;
    
    // Combine ruleStrings with "AND"
    const combinedRuleString = `${req.rule1String} AND ${req.rule2String}`;
  
    const combinedRule = new Rule({
      description: newDescription,
      ruleString: combinedRuleString, // Save the combined ruleString
      ast: req.combinedAST,           // Save the combined AST
    });
  
    combinedRule.save()
      .then(doc => {
        res.status(201).json(doc);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  };
  
// Recursive function to evaluate the AST
function evaluateAST(node, userData) {
    if (!node || !node.type || !node.value) {
        throw new Error(`Invalid AST node: ${JSON.stringify(node)}`);
    }

    if (node.type === 'operand') {
        // Evaluate the condition for operands, e.g., "age > 30"
        return evaluateCondition(node.value, userData);
    } else if (node.type === 'operator') {
        const leftResult = evaluateAST(node.left, userData);
        const rightResult = evaluateAST(node.right, userData);

        if (node.value === 'AND') {
            return leftResult && rightResult;
        } else if (node.value === 'OR') {
            return leftResult || rightResult;
        }
    }
}

  
  // Function to evaluate a condition (e.g., "age > 30")
  function evaluateCondition(condition, userData) {
    // Example: Parse condition "age > 30" or "department = 'Marketing'"
    const [attribute, operator, value] = parseCondition(condition);
    return compare(userData[attribute], operator, value);
}
  
// Simple condition parser (for conditions like "age > 30" or "department = 'Marketing'")
function parseCondition(condition) {
    console.log(`Parsing condition: ${condition}`);  // Add this line for debugging
    const regex = /(\w+)\s*(>=|<=|>|<|=)\s*('.*?'|\d+)/; // Updated regex to capture string literals
    const match = condition.match(regex);
    if (!match) {
        throw new Error(`Invalid condition format: ${condition}`);
    }

    const attribute = match[1];
    const operator = match[2];
    const value = isNaN(match[3]) ? match[3].replace(/'/g, '') : parseInt(match[3], 10); // Handle strings and numbers
    return [attribute, operator, value];
}

  
// Compare function to handle different operators
function compare(left, operator, right) {
    switch (operator) {
      case '>': return left > right;
      case '<': return left < right;
      case '=': return left === right;  // Using strict equality check
      case '>=': return left >= right;
      case '<=': return left <= right;
      case '!=': return left != right;
      default: throw new Error(`Unknown operator: ${operator}`);
    }
}

  
exports.evaluateRule= async (req, res) => {
    console.log('Request received at evaluator /rules/combine:', req.body); 
    const { description, userData } = req.body;
  
    try {
      // Step 1: Fetch the rule from the database by ID
      console.log(req.body);
      const rule = await Rule.findOne({ description: description });
      console.log(rule);
      if (!rule) {
        return res.status(404).json({ error: 'Rule not found' });
      }
  
      // Step 2: Extract the AST from the rule
      const ast = rule.ast;
  
      // Step 3: Evaluate the AST against the user data
      const result = evaluateAST(ast, userData);

      console.log(result);
  
      // Step 4: Return the result
      return res.json({ result });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  exports.getAllRule = async (req, res) => {
    try {
      // Find all rules but only select `ruleString` and `description`
      const rules = await Rule.find().select('ruleString description -_id');

  

      res.json(rules);     // Send the selected fields as the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
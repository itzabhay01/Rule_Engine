const mongoose = require('mongoose')
const model= require('../model/rules')
const Rule= model.Rule;

// Helper function to combine two ASTs with a logical operator
class ASTNode {
    constructor(type, value = null, left = null, right = null) {
      this.type = type;      // 'operator' or 'operand'
      this.value = value;    // AND, OR, or operand value like "age > 30"
      this.left = left;      // left child for operators
      this.right = right;    // right child for operators
    }
}
function combineASTs(ast1, ast2, operator) {
    return new ASTNode('operator', operator, ast1, ast2);
}
  
exports.combineASTs = (req, res, next) => {
  console.log('Request received at combiner /rules/combine:', req.body); 
    const { operator = 'AND' } = req.body;  // Default operator is 'AND'
    
    try {
      // Combine the two ASTs using the specified operator
      const combinedAST = combineASTs(req.rule1AST, req.rule2AST, operator);
      
      // Attach the combined AST to the request object
      req.combinedAST = combinedAST;
  
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(500).json({ error: 'Error combining ASTs', details: error.message });
    }
  };
  
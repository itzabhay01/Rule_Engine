class ASTNode {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;      // 'operator' or 'operand'
    this.value = value;    // AND, OR, or operand value like "age > 30"
    this.left = left;      // left child for operators
    this.right = right;    // right child for operators
  }
}

function tokenizeRule(ruleString) {
  // Capture parentheses, operators (AND, OR), and conditions with both numbers and strings
  const tokens = ruleString.match(/([()])|(\w+\s*(>=|<=|>|<|=)\s*(\d+|'[\w\s]+'|\d+))|\b(AND|OR)\b/g);
  return tokens;
}




function parseTokens(tokens) {
  if (tokens.length === 0) return null;

  let operandStack = [];
  let operatorStack = [];

  const precedence = { 'OR': 1, 'AND': 2 };

  function applyOperator() {
    if (operatorStack.length > 0) {
      const operator = operatorStack.pop();
      const right = operandStack.pop();
      const left = operandStack.pop();
      operandStack.push(new ASTNode('operator', operator, left, right));
    }
  }

  while (tokens.length > 0) {
    let token = tokens.shift();
    console.log("Processing token: ", token);  // Debugging line

    if (token === '(') {
      // Recursively parse inside parentheses and push the subtree to the operand stack
      operandStack.push(parseTokens(tokens));
    } else if (token === ')') {
      // Apply any operators when closing parentheses
      while (operatorStack.length > 0) {
        applyOperator();
      }
      break;
    } else if (token === 'AND' || token === 'OR') {
      // Apply operators based on precedence
      while (
        operatorStack.length > 0 &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        applyOperator();
      }
      operatorStack.push(token);
    } else {
      // Push operands to the stack
      operandStack.push(new ASTNode('operand', token));
      console.log("Pushed operand: ", token);  // Debugging line
    }
  }

  // After processing all tokens, apply remaining operators
  while (operatorStack.length > 0) {
    applyOperator();
  }

  console.log("Final AST: ", operandStack[0]);  // Debugging line

  return operandStack.length === 1 ? operandStack[0] : null;
}







function createRule(ruleString) {
    const tokens = tokenizeRule(ruleString);
    console.log("Generated Tokens: ", tokens);  // Debugging line
  
    if (!tokens || tokens.length === 0) {
      return null;  // Return null if no tokens are generated
    }
  
    const ast = parseTokens(tokens);
    console.log("Generated AST in createRule: ", ast);  // Debugging line
  
    return ast;
  }
 




exports.conversion = (req, res, next) => {
  if (req.body && req.body.ruleString) {
    try {
      const ast = createRule(req.body.ruleString);
      console.log("Generated AST: ", ast);  // Debugging line

      req.body.ast = ast;

      if (!ast) {
        return res.status(400).send({ error: 'Failed to generate AST' });
      }
    } catch (error) {
      console.log("Error in conversion middleware:", error);
      return res.status(400).send({ error: 'Invalid ruleString format' });
    }
  }

  next();
};


  
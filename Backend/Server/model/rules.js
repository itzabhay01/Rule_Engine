const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the AST Node schema
const ASTNodeSchema = new Schema({
  type: {
    type: String,
    enum: ['operator', 'operand'],
    required: true
  },
  value: {
    type: String,  // Stores the operator (AND, OR) or the operand (age > 30, etc.)
    required: true
  },
  left: {
    type: Schema.Types.Mixed,  // Recursively allow nested objects for left child (can be another AST node)
    default: null
  },
  right: {
    type: Schema.Types.Mixed,  // Recursively allow nested objects for right child (can be another AST node)
    default: null
  }
});

// Define the Rule schema
const RuleSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true  // Clean up extra spaces
  },
  ast: {
    type: ASTNodeSchema,  // Store the AST structure as a nested document
    required: true
  },
  ruleString: {
    type: String,
    required: false,  // Store the original rule string
  },
  // created_at: {
  //   type: Date,
  //   default: Date.now  // Auto-generate the creation timestamp
  // },
  // updated_at: {
  //   type: Date,
  //   default: Date.now  // Auto-generate the update timestamp
  // }
});

// Middleware to automatically update the "updated_at" field on updates
// RuleSchema.pre('save', function (next) {
//   this.updated_at = Date.now();
//   next();
// });

// Create the model from the schema

exports.Rule = mongoose.model('Rule', RuleSchema);

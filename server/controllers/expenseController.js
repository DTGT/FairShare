const expenseService = require('../services/expenseService');

// CREATE
exports.createExpense = async (req, res) => {
  try {
    const newExpense = await expenseService.createExpense(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - all Expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const Expenses = await expenseService.getAllExpenses();
    res.json(Expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - single Expense
exports.getExpenseById = async (req, res) => {
  try {
    const Expense = await expenseService.getExpenseById( parseInt(req.params.id));
    if (!Expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(Expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE (PATCH)
exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await expenseService.updateExpense(  parseInt(req.params.id), req.body);
    if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await expenseService.deleteExpense(parseInt(req.params.id));
    if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

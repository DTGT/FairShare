const expenseRepository = require('../repositories/expenseRepository');

async function createExpense(data) {    
  if (!data.amount || !data.description || !data.paidById || !data.groupId) {      
    throw new Error('Missing fields are required');
  }
  return expenseRepository.createExpense(data);
}

async function getAllExpenses() {
  return expenseRepository.getAllExpenses();
}

async function getExpenseById(id) {
  return expenseRepository.getExpenseById(id);
}

async function updateExpense(id, data) {
  return expenseRepository.updateExpense(id, data);
}

async function deleteExpense(id) {
  return expenseRepository.deleteExpense(id);
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
};

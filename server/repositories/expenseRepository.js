const prisma = require('../config/prisma');

async function createExpense(data) {
  return prisma.expense.create({ data });
}

async function getExpenseById(id) {
  return prisma.expense.findUnique({ where: { id } });
}

async function getAllExpenses() {
  return prisma.expense.findMany();
}

async function updateExpense(id, data) {
  return prisma.expense.update({ where: { id }, data });
}

async function deleteExpense(id) {
  return prisma.expense.delete({ where: { id } });
}

module.exports = {
  createExpense,
  getExpenseById,
  getAllExpenses,
  updateExpense,
  deleteExpense
};

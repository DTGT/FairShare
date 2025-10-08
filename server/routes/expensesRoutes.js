import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ########################################################### GET REQUESTS ###########################################################
// GET /api/expenses → get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: { paidBy: true, group: true },
    });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 3️⃣ GET /api/expenses/:id → get expense by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
      include: { paidBy: true, group: true },
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ########################################################### POST REQUESTS ###########################################################
// POST /api/expenses → create a new expense
router.post("/", async (req, res) => {
  const { amount, description, paidById, groupId } = req.body;

  if (!amount || !description || !paidById || !groupId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        amount,
        description,
        paidBy: { connect: { id: paidById } },
        group: { connect: { id: groupId } },
      },
      include: { paidBy: true, group: true },
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// // ########################################################### PATCH REQUESTS ########################################################### 
// Update an expense
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, description, paidById, groupId } = req.body;

  if (!amount && !description && !paidById && !groupId) {
    return res.status(400).json({ error: "At least one field is required to update" });
  }

  try {
    const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: {
        ...(amount !== undefined && { amount }),
        ...(description !== undefined && { description }),
        ...(paidById !== undefined && { paidById }),
        ...(groupId !== undefined && { groupId }),
      },
      include: { paidBy: true, group: true },
    });

    res.json(updatedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ########################################################### DELETE REQUESTS ###########################################################
// Delete an expense
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await prisma.expense.findUnique({ where: { id: parseInt(id) } });
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    await prisma.expense.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


export default router;
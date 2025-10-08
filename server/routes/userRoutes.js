import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ########################################################### GET REQUESTS ###########################################################
// Get all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
      include: { expenses: true, groups: true }, // include relations
    });
  res.json(users);
});

// Get user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



// ########################################################### POST REQUESTS ###########################################################
// Add a new user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Email must be unique" });
  }
});


// ########################################################### PATCH REQUESTS ###########################################################
// Update a user
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body || {};

  if (!name && !email) {
    return res.status(400).json({ error: "At least one field is required to update" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") { // unique constraint violation
      res.status(400).json({ error: "Email must be unique" });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// ########################################################### DELETE REQUESTS ###########################################################
// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if user has any expenses
    const userWithExpenses = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { expenses: true },
    });

    if (!userWithExpenses) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userWithExpenses.expenses.length > 0) {
      return res.status(400).json({ error: "Cannot delete user with existing expenses" });
    }

    // Safe to delete
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



export default router;

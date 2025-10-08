import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ########################################################### GET REQUESTS ###########################################################
// Get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await prisma.group.findMany({
      include: { users: true, expenses: true }, // include relations
    });
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get group by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const group = await prisma.group.findUnique({
      where: { id: parseInt(id) },
      include: { users: true, expenses: true },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



// ############################################################ POST REQUESTS ###########################################################
// Add a new group
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Group name is required" });
  }

  try {
    const group = await prisma.group.create({
      data: { name },
    });
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ########################################################### PATCH REQUESTS ###########################################################
// Update group name
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Group name is required" });
  }

  try {
    const updatedGroup = await prisma.group.update({
      where: { id: parseInt(id) },
      data: { name },
      include: { users: true, expenses: true }, // include relations
    });

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add or remove members from a group
router.patch("/:id/members", async (req, res) => {
  const { id } = req.params;
  const { addUserIds = [], removeUserIds = [] } = req.body;
  console.log("Add:", addUserIds);
  console.log("Remove:", removeUserIds);


  try {
    const group = await prisma.group.findUnique({ where: { id: parseInt(id) } });
    if (!group) return res.status(404).json({ error: "Group not found" });

    const updatedGroup = await prisma.group.update({
      where: { id: parseInt(id) },
      data: {
        users: {
          connect: addUserIds.map(userId => ({ id: userId })),
          disconnect: removeUserIds.map(userId => ({ id: userId })),
        },
      },
      include: { users: true, expenses: true },
    });

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// ########################################################### DELETE REQUESTS ###########################################################
// Delete a group
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const group = await prisma.group.findUnique({ where: { id: parseInt(id) } });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    await prisma.group.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});




export default router;

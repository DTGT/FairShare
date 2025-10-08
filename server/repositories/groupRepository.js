const prisma = require('../config/prisma');

async function createGroup(data) {
  return prisma.group.create({ data });
}

async function getGroupById(id) {
  return prisma.group.findUnique({
	  where: { id },
	  include: { users: true, expenses: true }
  });
}

async function getAllGroups() {
  return prisma.group.findMany({
	  include: { users: true, expenses: true }
  });
}

async function updateGroup(id, data) {
  return prisma.group.update({ where: { id }, data });
}

async function deleteGroup(id) {
  return prisma.group.delete({ where: { id } });
}

module.exports = {
  createGroup,
  getGroupById,
  getAllGroups,
  updateGroup,
  deleteGroup
};

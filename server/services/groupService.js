const groupRepository = require('../repositories/groupRepository');

async function createGroup(data) {    
  if (!data.name) {      
    throw new Error('Group name is required');
  }
  return groupRepository.createGroup(data);
}

async function getAllGroups() {
  return groupRepository.getAllGroups();
}

async function getGroupById(id) {
  return groupRepository.getGroupById(id);
}

async function updateGroup(id, data) {
  return groupRepository.updateGroup(id, data);
}

async function deleteGroup(id) {
  return groupRepository.deleteGroup(id);
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup
};

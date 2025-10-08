const userRepository = require('../repositories/userRepository');

async function createUser(data) {    
  if (!data.name || !data.email) {      
    throw new Error('Name and email are required');
  }
  return userRepository.createUser(data);
}

async function getAllUsers() {
  return userRepository.getAllUsers();
}

async function getUserById(id) {
  return userRepository.getUserById(id);
}

async function updateUser(id, data) {
  return userRepository.updateUser(id, data);
}

async function deleteUser(id) {
  return userRepository.deleteUser(id);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

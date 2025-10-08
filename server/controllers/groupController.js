const groupService = require('../services/groupService');

// CREATE
exports.createGroup = async (req, res) => {
  try {
    const newGroup = await groupService.createGroup(req.body);
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - all Groups
exports.getAllGroups = async (req, res) => {
  try {
    const Groups = await groupService.getAllGroups();
    res.json(Groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - single Group
exports.getGroupById = async (req, res) => {
  try {
    const Group = await groupService.getGroupById( parseInt(req.params.id));
    if (!Group) return res.status(404).json({ message: 'Group not found' });
    res.json(Group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE (PATCH)
exports.updateGroup = async (req, res) => {
  try {
    const updatedGroup = await groupService.updateGroup(  parseInt(req.params.id), req.body);
    if (!updatedGroup) return res.status(404).json({ message: 'Group not found' });
    res.json(updatedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await groupService.deleteGroup(parseInt(req.params.id));
    if (!deletedGroup) return res.status(404).json({ message: 'Group not found' });
    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

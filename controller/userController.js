const { v4: uuidv4 } = require('uuid');
const { validateEmail } = require('../utils/validation');

let users = []; // In-memory storage

// Create User
exports.createUser = (req, res) => {
  const { name, email, age } = req.body;

  // Input validation
  if (!name || !email || !age) {
    return res.status(400).json({ message: 'Name, email, and age are required.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  const newUser = { id: uuidv4(), name, email, age };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Get All Users
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// Get User by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  res.status(200).json(user);
};

// Update User
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }

  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  users[userIndex] = { ...users[userIndex], name, email, age };
  res.status(200).json(users[userIndex]);
};

// Delete User
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User deleted successfully.' });
};

import { filterSensitiveFields } from '../middleware/auth.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create User
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    const filteredUser = filterSensitiveFields(user, ['password']);
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
   
      res.json({ msg: 'User created successfully',user: filteredUser, token });
    });
  } catch (err) {
    console.error(err.message);
       res.status(500).send(`${err.message}`);
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const filteredUsers = users.map(user => filterSensitiveFields(user, ['password']));
    res.json(filteredUsers);
  } catch (err) {
    console.error(err.message);
       res.status(500).send(`${err.message}`);
  }
};

// Get User by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const filteredUser = filterSensitiveFields(user, ['password']);
    res.json(filteredUser);
  } catch (err) {
    console.error(err.message);
       res.status(500).send(`${err.message}`);
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    const filteredUser = filterSensitiveFields(user, ['password']);
    res.json({ msg: 'Updated user successfully',user: filteredUser });
  } catch (err) {
    console.error(err.message);
       res.status(500).send(`${err.message}`);
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }


    await user.deleteOne();
    res.json({ msg: 'User removed successfully' });
  } catch (err) {
    console.error(err.message);
       res.status(500).send(`${err.message}`);
  }
};

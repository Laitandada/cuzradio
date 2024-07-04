import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { filterSensitiveFields } from '../middleware/auth.js';

dotenv.config();

export const register = async (req, res) => {
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
   
      res.json({ user: filteredUser, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`${err.message}`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
 
    if (!user) {
      return res.status(400).json({ msg: 'User does not exists' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Wrong password, try again' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    const filteredUser = filterSensitiveFields(user, ['password']);
   
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ user: filteredUser, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`${err.message}`);
  }
};

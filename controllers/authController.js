import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { filterSensitiveFields } from '../middleware/auth.js';

dotenv.config();

// Sign up
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
    // hash the user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

        // remove user password from object
    const filteredUser = filterSensitiveFields(user, ['password']);

    // create a token for user
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
   
      res.json({ msg: 'User created successfully',user: filteredUser, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`${err.message}`);
  }
};


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
 
    if (!user) {
      return res.status(400).json({ msg: 'User does not exists' });
    }

    // check if the tokens match
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

        // remove user password from object
    const filteredUser = filterSensitiveFields(user, ['password']);
   
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({msg: 'Login successfully',user: filteredUser, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`${err.message}`);
  }
};

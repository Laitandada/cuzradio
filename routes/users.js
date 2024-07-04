import express from 'express';
import {auth, checkRole } from '../middleware/auth.js';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/userControllers.js';
// import { createUser } from '../controllers/userController.js';
const router = express.Router();

// Define routes for different user types and CRUD operations
router.post('/create-user', auth, checkRole(['admin']), createUser);
router.get('/', auth, checkRole(['admin', 'primary', 'secondary']), getUsers);
router.get('/:id', auth, checkRole(['admin', 'primary', 'secondary']), getUser);
router.put('/:id', auth, checkRole(['admin', 'primary']), updateUser);
router.delete('/:id', auth, checkRole(['admin']), deleteUser);

export default router;

import mongoose from 'mongoose';
import express from 'express';
import userModel from '../models/users';

const router = express.Router();

router.post('/signup', (req, res) => {
  res.status(201).json({ message: 'Req recieved' });
});

export default module.exports = router;

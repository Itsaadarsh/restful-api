import mongoose from 'mongoose';
import express from 'express';
import userModel from '../models/users';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/login', async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user === null) {
    res.status(404).json({ message: `No user found with this email id ${req.body.email}` });
  } else {
    bcrypt.compare(req.body.passward, user.passward, (err, pass) => {
      if (err || pass == false) {
        res.status(401).json({ message: 'Auth failed' });
      } else {
        res.status(200).json({ message: 'Login successful' });
      }
    });
  }
});

router.post('/signup', async (req, res) => {
  const user = await userModel.find({ email: req.body.email });
  if (user.length == 0) {
    bcrypt.hash(req.body.passward, 10, async (err, hash) => {
      try {
        if (!err) {
          const user = new userModel({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            passward: hash,
          });
          const createdUser = await user.save();
          res.status(201).json(createdUser);
        } else {
          res.status(409).json({ message: 'Hash error', error: err });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
      }
    });
  } else {
    res.status(409).json({ message: 'This email already exists' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const deletedUser = await userModel.deleteOne({ _id: req.params.userId });
    if (deletedUser.n == 1) {
      res.status(200).json({ message: `USER ${req.params.userId} deleted successfully` });
    } else {
      res.status(404).json({ message: `USER not found` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

export default module.exports = router;

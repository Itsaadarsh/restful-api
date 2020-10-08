import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  },
  passward: { type: mongoose.Schema.Types.String, required: true },
});

interface USER extends mongoose.Document {
  _id: string;
  email: string;
  passward: string;
}

const userModel = mongoose.model<USER>('users', userSchema);

export default module.exports = userModel;

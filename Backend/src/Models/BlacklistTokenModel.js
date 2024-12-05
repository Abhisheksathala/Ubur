import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema for the blacklist token
const blacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24 hours in seconds
  },
});

// Create and export the model
const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);
export default BlacklistToken;

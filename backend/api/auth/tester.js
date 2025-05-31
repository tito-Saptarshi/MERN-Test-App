import { connectDB } from '../../../lib/db.js';
import User from '../../../models/User.js';

export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'POST') {
    const { email, password, fullName } = req.body;
    try {
      const newUser = await User.create({ email, fullName, password });
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
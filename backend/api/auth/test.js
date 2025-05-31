import { connectDB } from '../../../lib/db.js';

export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'GET') {
    res.status(200).json({ message: "Auth route working!" });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
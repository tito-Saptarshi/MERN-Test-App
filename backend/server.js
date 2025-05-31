import express from "express";
import "dotenv/config";
import User from "./models/User.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;
import cors from "cors";

app.use(express.json());

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true, // allow frontend to send cookies
// }));


app.use(cors({
    origin: "https://mern-test-app-beta.vercel.app/",
    credentials: true, // allow frontend to send cookies
}));

const authRoutes = express.Router();

authRoutes.get("/test", (req, res) => {
  res.status(200).json({ message: "Auth route working!" });
});

authRoutes.post("/tester", async (req, res) => {
  const { email, password, fullName } = req.body;

  try {

    const newUser = await User.create({
      email,
      fullName,
      password,
  
    });

    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
   connectDB();
})


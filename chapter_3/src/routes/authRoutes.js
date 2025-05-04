import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { json } from "stream/consumers";

const router = express.Router();

// Register new user endpoint /auth/register
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // encrypt pwd
  const hashPassword = bcrypt.hashSync(password, 8);

  // save new user aand hashedpasswrod to db
  try {
    const insertUser = db.prepare(`INSERT INTO users (username, password)
        VALUES (?, ?)`);
    const result = insertUser.run(username, hashPassword);

    // create default todo for user
    const defaultTodo = "Hello, add your first todo!";
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
        VALUES (?, ?)`);
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {});

export default router;

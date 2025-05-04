import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// Register new user endpoint /auth/register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // encrypt pwd
  const hashPassword = bcrypt.hashSync(password, 8);

  console.log(hashPassword);
  res.sendStatus(201);
});

router.post("/login", (req, res) => {});

export default router;

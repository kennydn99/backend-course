import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

// Register new user endpoint /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // encrypt pwd
  const hashPassword = bcrypt.hashSync(password, 8);

  // save new user aand hashedpasswrod to db
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    // create default todo for user
    const defaultTodo = "Hello, add your first todo!";

    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id,
      },
    });

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // if user not found, return out of function
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    // if password does not match, return out of function
    if (!passwordIsValid) {
      return res.status(401).send({ message: "invalid password" });
    }
    console.log(user);
    // then we have successful authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

export default router;

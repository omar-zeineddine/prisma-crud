const express = require("express");
const app = express();
const port = 5000;

// prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

// endpoints

// get all users
app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

// create user
app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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

// update user
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newAge = req.body.age;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { age: newAge },
  });
  res.json(updatedUser);
});

// delete user
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

// home
app.post("/home", async (req, res) => {
  const newHome = await prisma.home.create({ data: req.body });
  res.json(newHome);
});

app.get("/homes", async (req, res) => {
  const allHomes = await prisma.home.findMany({
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHomes);
});

app.get("/home/:id", async (req, res) => {
  const id = req.params.id;
  const home = await prisma.home.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(home);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

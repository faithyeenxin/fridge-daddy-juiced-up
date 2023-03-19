const express = require("express");
const router = express.Router();

const SECRET = process.env.SECRET ?? "faithmadethis";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route

router.get("/seed", async (req, res) => {
  await prisma.user.deleteMany({});
  const seedUsers = await prisma.user.createMany({
    data: [
      {
        name: "Test User",
        email: "testUser@hotmail.com",
        password: bcrypt.hashSync("Password123!", 10),
        image:
          "https://i.mydramalist.com/eJNje_5c.jpg",
        dateJoined: new Date(2022, 10, 05),
      },
      {
        name: "Administrator",
        email: "admin123@hotmail.com",
        password: bcrypt.hashSync("password123", 10),
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg",
        dateJoined: new Date(2022, 10, 05),
      },
      {
        name: "Benjamine",
        email: "benjamine123@hotmail.com",
        password: bcrypt.hashSync("ben123", 10),
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg",
        dateJoined: new Date(2022, 10, 02),
      },
      {
        name: "Chelsea",
        email: "chealsea123@hotmail.com",
        password: bcrypt.hashSync("chelsea123", 10),
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg",
        dateJoined: new Date(2022, 10, 03),
      },
      {
        name: "Dominique",
        email: "dominique123@hotmail.com",
        password: bcrypt.hashSync("dom123", 10),
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg",
        dateJoined: new Date(2022, 10, 04),
      },
      {
        name: "Faith",
        email: "faith123@hotmail.com",
        password: bcrypt.hashSync("Faithyeenx5!", 10),
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg",
        dateJoined: new Date(2022, 10, 01),
      },
    ],
  });
  const allUsers = await prisma.user.findMany();
  res.status(200).send(allUsers);
});

//* Show All Users
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).send(allUsers);
});

//* Show By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).send(user);
});

//* Find by Email
router.get("/findByEmail/:email", async (req, res) => {
  const { email } = req.params;
  const user = await prisma.user.findMany({ where: { email: email } });
  if (user.length === 0) {
    res.status(200).send([]);
  } else {
    res.status(200).send(user);
  }
});

//* Create User
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const user = await prisma.user.create({
      data: newUser,
    });
    const token = jwt.sign(user, SECRET, { expiresIn: "30m" });
    res.status(200).send({ token: token });
  } catch {
    res.status(400).send({ err: "User already exists" });
  }
});

//* Create/Login Google User
router.post("/google", async (req, res) => {
  try {
    const googleUser = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
    });
    if (existingUser === null) {
      const user = await prisma.user.create({
        data: {
          name: `${googleUser.given_name} ${googleUser.family_name}`,
          password: `${bcrypt.hashSync(googleUser.email, 10)}`,
          image: `${googleUser.picture}`,
          email: `${googleUser.email}`,
        },
      });
      const token = jwt.sign(user, SECRET, { expiresIn: "30m" });
      res.status(200).send({ token: token });
    } else {
      const token = jwt.sign(existingUser, SECRET, { expiresIn: "30m" });
      res.status(200).send({ token: token });
    }
  } catch {
    res.status(400).send({ err: "There is an error" });
  }
});

//* User LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user === null) {
    res.status(400).send({ error: "User Not Found" });
  } else if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(user, SECRET, { expiresIn: "30m" });
    res.status(200).send({ token: token });
  } else {
    res.status(400).send({ error: "Wrong password" });
  }
});

//* User Change Password
router.put("/change-password", async (req, res) => {
  const { id, password, newPassword } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (user === null) {
    res.status(400).send({ error: "User Not Found" });
  } else if (bcrypt.compareSync(password, user.password)) {
    const updatedData = user
    updatedData.password = bcrypt.hashSync(newPassword, 10)
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: updatedData,
    });
    res.status(200).send(updatedUser);
  } else {
    res.status(400).send({ error: "Incorrect current password entered" });
  }
});

//* User LOGIN GOOGLE
router.post("/login-google", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user === null) {
    res.status(400).send({ error: "User Not Found" });
  } else {
    const token = jwt.sign(user, SECRET, { expiresIn: "30m" });
    res.status(200).send({ token: token });
  }
});

//* Update
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const updatedData = req.body;
//   const user = await prisma.user.update({
//     where: {
//       id: id,
//     },
//     data: updatedData,
//   });
//   res.status(200).send(user);
// });

//* Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const items = await prisma.item.deleteMany({
      where: {
        userId: id,
      },
    });
    // const categories = await prisma.category.deleteMany({
    //   where: {
    //     userId: id,
    //   },
    // });
    const userFound = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const userDeleted = await prisma.user.delete({
      where: {
        email: userFound.email,
      },
    });
    res.status(200).send(userDeleted);
  } catch {
    res.status(400).send({ error: `Unable to delete user with id ${id}` });
  }
});

module.exports = router;

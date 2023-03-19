const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route
router.get("/seed", async (req, res) => {
  // await prisma.category.deleteMany({});
  const seedItems = await prisma.category.createMany({
    data: [
      {
        // userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "beef steak",
        dateCreated: new Date(2022, 12, 19),
        pantryDays: 0,
        fridgeDays: 3,
        freezerDays: 121,
      },
      {
        // userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "fresh juice",
        dateCreated: new Date(2022, 12, 19),
        pantryDays: 0,
        fridgeDays: 3,
        freezerDays: 365,
      },
      {
        // userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "fruit pie",
        dateCreated: new Date(2022, 12, 19),
        pantryDays: 0,
        fridgeDays: 4,
        freezerDays: 182,
      },
      {
        // userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "uncooked fresh sausages",
        dateCreated: new Date(2022, 12, 19),
        pantryDays: 0,
        fridgeDays: 2,
        freezerDays: 62,
      },
      {
        // userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "cooked sausages",
        dateCreated: new Date(2022, 12, 19),
        pantryDays: 0,
        fridgeDays: 4,
        freezerDays: 62,
      },
      {
        // userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "hard/dry sausages",
        dateCreated: new Date(2022, 12, 19),
        pantryDays: 0,
        fridgeDays: 21,
        freezerDays: 62,
      },
      {
        // userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "cooked noodles",
        dateCreated: new Date(2022, 12, 19),
        pantryDays: 0,
        fridgeDays: 5,
        freezerDays: 31,
      },
    ],
  });
  const allCategories = await prisma.category.findMany();
  res.status(200).send(allCategories);
});

//* Show All Category
router.get("/", async (req, res) => {
  const allCategories = await prisma.category.findMany();
  res.status(200).send(allCategories);
});

//* Show By Category ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).send(category);
});

//* Show By User ID
// router.get("/user/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const item = await prisma.category.findMany({
//     where: {
//       userId: userId,
//     },
//   });
//   res.status(200).send(item);
// });

//* Find by Item Name
router.get("/findByCategoryName/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await prisma.category.findMany({
      where: { name: { contains: categoryName } },
    });
    res.status(200).send(category);
  } catch {
    res.status(400).send({ error: "category does not exist" });
  }
});

//* Create Item
router.post("/", async (req, res) => {
  try {
    const newCategory = req.body;
    const category = await prisma.category.create({
      data: newCategory,
    });
    res.status(200).send(category);
  } catch {
    res.status(400).send({ error: "could not create category" });
  }
});

//* Update Category
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const category = await prisma.category.update({
    where: {
      id: id,
    },
    data: updatedData,
  });
  res.status(200).send(category);
});

//* Delete Category based on ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send(deletedCategory);
  } catch {
    res.status(400).send({ error: "category does not exist" });
  }
});

module.exports = router;

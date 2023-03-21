const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route
router.get("/seed", async (req, res) => {
  await prisma.item.deleteMany({});
  const seedItems = await prisma.item.createMany({
    data: [
      {
        userId: "d1714f0b-7d80-403f-b2eb-2549c93438d6",
        name: "beef steak",
        purchaseDate: new Date(2022, 01, 19),
        expiryDate: new Date(2023, 01, 31),
        categoryId: "5b972acd-7604-43d6-a7bb-23ab70d54059",
        storedIn: "Fridge",
        quantity: "2 Flanks",
        trashed: false,
      },
      {
        userId: "d1714f0b-7d80-403f-b2eb-2549c93438d6",
        name: "fresh orange juice",
        purchaseDate: new Date(2022, 12, 31),
        expiryDate: new Date(2023, 02, 02),
        categoryId: "9cabaea1-2922-4c37-8826-8cd034e623b7",
        storedIn: "Fridge",
        quantity: "2 Jugs",
        trashed: false,
      },
      {
        userId: "d1714f0b-7d80-403f-b2eb-2549c93438d6",
        name: "apple pie",
        purchaseDate: new Date(2022, 01, 19),
        expiryDate: new Date(2023, 03, 20),
        categoryId: "a9a4cf31-4ca3-4856-9ce5-662ec5fe3723",
        storedIn: "Fridge",
        quantity: "2 Portions",
        trashed: false,
      },
      {
        userId: "d1714f0b-7d80-403f-b2eb-2549c93438d6",
        name: "sausage links",
        purchaseDate: new Date(2022, 01, 19),
        expiryDate: new Date(2022, 11, 01),
        categoryId: "247723f6-501f-48b1-88ca-8500b49196da",
        storedIn: "Fridge",
        quantity: "2 250grams Packets",
        trashed: false,
      },
      {
        userId: "d1714f0b-7d80-403f-b2eb-2549c93438d6",
        name: "hokkaido ramen",
        purchaseDate: new Date(2022, 12, 27),
        expiryDate: new Date(2023, 01, 02),
        categoryId: "3e18a31d-d1e4-44d3-99bc-39e4ae7c843a",
        storedIn: "Fridge",
        quantity: "1 Bowl",
        trashed: false,
      },
    ],
  });
  const allItems = await prisma.item.findMany();
  res.status(200).send(allItems);
});

//* Show All Items
router.get("/", async (req, res) => {
  const allItems = await prisma.item.findMany({
    include: {
      category: true,
    },
    orderBy: {
      expiryDate: 'asc',
    },
  });
  res.status(200).send(allItems);
});

//* Show By Item ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
  res.status(200).send(item);
});

//* Show By User ID
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const item = await prisma.item.findMany({
    where: {
      userId: userId,
    },
    include: {
      category: true,
    },
    orderBy: { expiryDate: "asc" },
  });
  res.status(200).send(item);
});

//* Find by Item Name
router.get("/findByItemName/:itemName", async (req, res) => {
  const { itemName } = req.params;
  const item = await prisma.item.findMany({
    where: { name: { contains: itemName } },
    include: {
      category: true,
    },
  });
  if (item.length === 0) {
    res.status(400).send([]);
  } else {
    res.status(200).send(item);
  }
});

//* Create Item
router.post("/", async (req, res) => {
  try {
    const newItem = req.body;
    const item = await prisma.item.create({
      data: newItem,
      include: {
        category: true,
      },
    });
    res.status(200).send(item);
  } catch {
    res.status(400).send({ error: "could not create item" });
  }
});

//* Update Item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const item = await prisma.item.update({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
    data: updatedData,
  });
  res.status(200).send(item);
});

//* Trash Item based on ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });
    const trashedItem = await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        trashed: !item.trashed,
      },
    });
    res.status(200).send(trashedItem);
  } catch {
    res.status(400).send({ error: "item does not exist" });
  }
});

//* Trash All Trashed Items
router.delete("/user/:userId/trash-all", async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedItems = await prisma.item.deleteMany({
      where: {
        userId: userId,
        trashed: true,
      },
    });
    const items = await prisma.item.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: true,
      },
      orderBy: { expiryDate: "asc" },
    });
    res.status(200).send(items);
  } catch {
    res.status(400).send({ error: "unable to trash items" });
  }
});

module.exports = router;

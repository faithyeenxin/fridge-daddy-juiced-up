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
        userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "beef steak",
        purchaseDate: new Date(2022, 01, 19),
        expiryDate: new Date(2023, 01, 31),
        categoryId: "b5c81da1-bc84-49e6-a7de-9ade933955bb",
        storedIn: "Fridge",
        quantity: "2 Flanks",
        trashed: false,
      },
      {
        userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "fresh orange juice",
        purchaseDate: new Date(2022, 12, 31),
        expiryDate: new Date(2023, 02, 02),
        categoryId: "77541b1b-593e-48b7-91b1-55f0a8da7b08",
        storedIn: "Fridge",
        quantity: "2 Jugs",
        trashed: false,
      },
      {
        userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "apple pie",
        purchaseDate: new Date(2022, 01, 19),
        expiryDate: new Date(2023, 03, 20),
        categoryId: "40a9402f-47e0-4e61-978f-4bf0fafc8b6f",
        storedIn: "Fridge",
        quantity: "2 Portions",
        trashed: false,
      },
      {
        userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "sausage links",
        purchaseDate: new Date(2022, 01, 19),
        expiryDate: new Date(2022, 11, 01),
        categoryId: "2be78555-b597-478e-af65-ff369bb42bc4",
        storedIn: "Fridge",
        quantity: "2 250grams Packets",
        trashed: false,
      },
      {
        userId: "e4fca1e7-deb9-41c4-b8c7-b0fe9aebadea",
        name: "hokkaido ramen",
        purchaseDate: new Date(2022, 12, 27),
        expiryDate: new Date(2023, 01, 02),
        categoryId: "45f81f64-f1b2-4911-b5e3-324fafea807d",
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
router.delete("/user/:id/trash-all", async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedItems = await prisma.item.deleteMany({
      where: {
        trashed: true,
      },
    });
    console.log(deletedItems)
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

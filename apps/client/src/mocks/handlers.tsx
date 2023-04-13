import { rest } from 'msw';
import { act } from 'react-dom/test-utils';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  //////////////////////////////////////////////////////
  //// * USER
  //////////////////////////////////////////////////////

  //* Show All Users
  rest.get('/api/user', async (req, res, ctx) => {
    await sleep(100);
    return res(
      ctx.json([
        {
          id: 'e337087d-6e56-453d-b87f-c0e8bd4da326',
          password:
            '$2b$10$R2sJ.SJz6.vxJ1AbntZ/sOxdFsvMuByhpzi8yL/a43Ws8gKp0hfra',
          name: 'Administrator',
          image:
            'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
          email: 'admin123@hotmail.com',
          dateJoined: '2022-11-04T16:00:00.000Z',
        },
        {
          id: '52d40a05-446e-4055-ab41-2f93585c71a1',
          password:
            '$2b$10$DkQ7QwQ9TNBMOfO1iUFcfuiu21APH9PuVoy98D9axWnO.Mlngp7sS',
          name: 'Benjamine',
          image:
            'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
          email: 'benjamine123@hotmail.com',
          dateJoined: '2022-11-01T16:00:00.000Z',
        },
        {
          id: '4fe91baa-a7d2-4146-85aa-ab11a5fea37c',
          password:
            '$2b$10$wfPxMfrC8Nw0pSMf5QDQde9p2.ca0UHZaC8fG1XeKBi1rV4m1mM4G',
          name: 'Chelsea',
          image:
            'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
          email: 'chealsea123@hotmail.com',
          dateJoined: '2022-11-02T16:00:00.000Z',
        },
      ])
    );
  }),

  //* Show By ID
  rest.get('/api/user/:id', async (req, res, ctx) => {
    await sleep(100);
    const { id } = req.params;
    if (id.length > 10) {
      return res(
        ctx.json({
          id: id,
          password:
            '$2b$10$wfPxMfrC8Nw0pSMf5QDQde9p2.ca0UHZaC8fG1XeKBi1rV4m1mM4G',
          name: 'Chelsea',
          image:
            'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
          email: 'chealsea123@hotmail.com',
          dateJoined: '2022-11-02T16:00:00.000Z',
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'User not found' })
      );
    }
  }),

  // * Find by Email (test-email@hotmail.com)
  rest.get('/api/user/findByEmail/:email', async (req, res, ctx) => {
    const { email } = req.params;
    if (email === 'test-email@hotmail.com') {
      return res(ctx.status(200), ctx.json([]));
    } else {
      return res(
        ctx.json([
          {
            id: '4fe91baa-a7d2-4146-85aa-ab11a5fea37c',
            password:
              '$2b$10$wfPxMfrC8Nw0pSMf5QDQde9p2.ca0UHZaC8fG1XeKBi1rV4m1mM4G',
            name: 'Chelsea',
            image:
              'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
            email: email,
            dateJoined: '2022-11-02T16:00:00.000Z',
          },
          {
            id: '4fe91baa-a7d2-4146-85aa-ab11a5fea37c',
            password:
              '$2b$10$wfPxMfrC8Nw0pSMf5QDQde9p2.ca0UHZaC8fG1XeKBi1rV4m1mM4G',
            name: 'Chelsea',
            image:
              'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
            email: email,
            dateJoined: '2022-11-02T16:00:00.000Z',
          },
          {
            id: '4fe91baa-a7d2-4146-85aa-ab11a5fea37c',
            password:
              '$2b$10$wfPxMfrC8Nw0pSMf5QDQde9p2.ca0UHZaC8fG1XeKBi1rV4m1mM4G',
            name: 'Chelsea',
            image:
              'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
            email: email,
            dateJoined: '2022-11-02T16:00:00.000Z',
          },
        ])
      );
    }
  }),

  //* Create User
  rest.post('/api/user', async (req, res, ctx) => {
    await sleep(100);
    const newUser = await req.json();
    if (typeof newUser) {
      return res(ctx.json({ token: 'this-is-my-test-token' }));
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to create new user' })
      );
    }
  }),

  //* Create Google User
  rest.post('/api/user/google', async (req, res, ctx) => {
    await sleep(100);
    const newUser = await req.json();
    if (typeof newUser) {
      return res(ctx.json({ token: 'this-is-my-test-token' }));
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to create new user' })
      );
    }
  }),

  //* User Login
  rest.post('/api/user/login', async (req, res, ctx) => {
    await sleep(100);
    const existingUser = await req.json();
    if (typeof existingUser) {
      return res(ctx.json({ token: 'this-is-my-test-token' }));
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'User not found' })
      );
    }
  }),

  //* User Login Google
  rest.post('/api/user/login-google', async (req, res, ctx) => {
    await sleep(100);
    const existingUser = await req.json();
    if (typeof existingUser) {
      return res(ctx.json({ token: 'this-is-my-test-token' }));
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'User not found' })
      );
    }
  }),

  //* User Change Password
  rest.put('/api/user/change-password', async (req, res, ctx) => {
    await sleep(100);
    const { id, password, newPassword } = await req.json();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (
      id.length > 10 ||
      passwordRegex.test(String(password)) ||
      passwordRegex.test(String(newPassword))
    ) {
      return res(
        ctx.json({
          id: '4fe91baa-a7d2-4146-85aa-ab11a5fea37c',
          password:
            '$2b$10$wfPxMfrC8Nw0pSMf5QDQde9p2.ca0UHZaC8fG1XeKBi1rV4m1mM4G',
          name: 'Updated User',
          image:
            'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
          email: 'updatedUser123@hotmail.com',
          dateJoined: '2022-11-02T16:00:00.000Z',
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to change password.' })
      );
    }
  }),

  //* Delete User
  rest.delete('/api/user/change-password', async (req, res, ctx) => {
    await sleep(100);
    const { id } = await req.json();
    if (id) {
      return res(
        ctx.json({
          id: '4fe91baa-a7d2-4146-85aa-ab11a5fea37c',
          password:
            '$2b$10$wfPxMfrC8Nw0pSMf5QDQde9p2.ca0UHZaC8fG1XeKBi1rV4m1mM4G',
          name: 'Deleted User',
          image:
            'https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665411728/samples/people/new_user_fnx00w.jpg',
          email: 'deletedUser123@hotmail.com',
          dateJoined: '2022-11-02T16:00:00.000Z',
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to delete user' })
      );
    }
  }),
  //////////////////////////////////////////////////////
  //// * ITEM
  //////////////////////////////////////////////////////

  //* Show All Items
  rest.get('/api/item', async (req, res, ctx) => {
    await sleep(100);
    return res(
      ctx.json([
        {
          id: '58c89a9d-d702-45b2-8817-9b42afbf747c',
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: '5b972acd-7604-43d6-a7bb-23ab70d54059',
          name: 'beef steak',
          purchaseDate: '2022-02-18T16:00:00.000Z',
          expiryDate: '2023-03-02T16:00:00.000Z',
          storedIn: 'Freezer',
          quantity: '2 Flanks',
          trashed: false,
          category: {
            id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
            name: 'beef steak',
            dateCreated: '2023-01-18T16:00:00.000Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 121,
          },
        },
        {
          id: 'ac6355ff-1ad0-468f-8349-a6110e4c267c',
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: '377e5868-4038-47ce-81ca-58e14109631f',
          name: 'Salmon',
          purchaseDate: '2023-03-22T16:00:00.000Z',
          expiryDate: '2023-03-25T16:00:00.000Z',
          storedIn: 'Fridge',
          quantity: '1 fillet',
          trashed: false,
          category: {
            id: '377e5868-4038-47ce-81ca-58e14109631f',
            name: 'Fish',
            dateCreated: '2023-03-23T13:40:07.478Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 31,
          },
        },
        {
          id: 'ca551653-210b-42eb-b406-1772166c5a3e',
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
          name: 'Apple Pie',
          purchaseDate: '2023-03-22T16:00:00.000Z',
          expiryDate: '2023-03-26T16:00:00.000Z',
          storedIn: 'Fridge',
          quantity: '1 Pie',
          trashed: true,
          category: {
            id: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
            name: 'fruit pie',
            dateCreated: '2023-01-18T16:00:00.000Z',
            pantryDays: 0,
            fridgeDays: 4,
            freezerDays: 182,
          },
        },
      ])
    );
  }),

  //* Show By ID
  rest.get('/api/item/:id', async (req, res, ctx) => {
    await sleep(100);
    const { id } = req.params;
    if (id) {
      return res(
        ctx.json({
          id: id,
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: '377e5868-4038-47ce-81ca-58e14109631f',
          name: 'Salmon',
          purchaseDate: '2023-03-22T16:00:00.000Z',
          expiryDate: '2023-03-25T16:00:00.000Z',
          storedIn: 'Fridge',
          quantity: '1 fillet',
          trashed: false,
          category: {
            id: '377e5868-4038-47ce-81ca-58e14109631f',
            name: 'Fish',
            dateCreated: '2023-03-23T13:40:07.478Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 31,
          },
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Item not found' })
      );
    }
  }),

  //* Show By User ID
  rest.get('/api/item/user/:userId', async (req, res, ctx) => {
    await sleep(100);
    const { userId } = req.params;
    if (userId) {
      return res(
        ctx.json([
          {
            id: userId,
            userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
            categoryId: '5b972acd-7604-43d6-a7bb-23ab70d54059',
            name: 'beef steak',
            purchaseDate: '2022-02-18T16:00:00.000Z',
            expiryDate: '2023-03-02T16:00:00.000Z',
            storedIn: 'Freezer',
            quantity: '2 Flanks',
            trashed: false,
            category: {
              id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
              name: 'beef steak',
              dateCreated: '2023-01-18T16:00:00.000Z',
              pantryDays: 0,
              fridgeDays: 3,
              freezerDays: 121,
            },
          },
          {
            id: userId,
            userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
            categoryId: '377e5868-4038-47ce-81ca-58e14109631f',
            name: 'Salmon',
            purchaseDate: '2023-03-22T16:00:00.000Z',
            expiryDate: '2023-03-25T16:00:00.000Z',
            storedIn: 'Fridge',
            quantity: '1 fillet',
            trashed: false,
            category: {
              id: '377e5868-4038-47ce-81ca-58e14109631f',
              name: 'Fish',
              dateCreated: '2023-03-23T13:40:07.478Z',
              pantryDays: 0,
              fridgeDays: 3,
              freezerDays: 31,
            },
          },
          {
            id: userId,
            userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
            categoryId: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
            name: 'Apple Pie',
            purchaseDate: '2023-03-22T16:00:00.000Z',
            expiryDate: '2023-03-26T16:00:00.000Z',
            storedIn: 'Fridge',
            quantity: '1 Pie',
            trashed: true,
            category: {
              id: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
              name: 'fruit pie',
              dateCreated: '2023-01-18T16:00:00.000Z',
              pantryDays: 0,
              fridgeDays: 4,
              freezerDays: 182,
            },
          },
        ])
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Items not found' })
      );
    }
  }),
  //* Find By Item Name
  rest.get('/api/item/findByItemName/:itemName', async (req, res, ctx) => {
    await sleep(100);
    const { itemName } = req.params;

    if (itemName) {
      return res(
        ctx.json({
          id: '58c89a9d-d702-45b2-8817-9b42afbf747c',
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: '377e5868-4038-47ce-81ca-58e14109631f',
          name: 'Salmon',
          purchaseDate: '2023-03-22T16:00:00.000Z',
          expiryDate: '2023-03-25T16:00:00.000Z',
          storedIn: 'Fridge',
          quantity: '1 fillet',
          trashed: false,
          category: {
            id: '377e5868-4038-47ce-81ca-58e14109631f',
            name: itemName,
            dateCreated: '2023-03-23T13:40:07.478Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 31,
          },
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Item not found' })
      );
    }
  }),
  //* Create Item
  rest.post('/api/item', async (req, res, ctx) => {
    const newItem = await req.json();
    await sleep(100);
    if (typeof newItem) {
      return res(
        ctx.json({
          id: '58c89a9d-d702-45b2-8817-9b42afbf747c',
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: '5b972acd-7604-43d6-a7bb-23ab70d54059',
          name: 'beef steak',
          purchaseDate: '2022-02-18T16:00:00.000Z',
          expiryDate: '2023-03-02T16:00:00.000Z',
          storedIn: 'Freezer',
          quantity: '2 Flanks',
          trashed: false,
          category: {
            id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
            name: 'beef steak',
            dateCreated: '2023-01-18T16:00:00.000Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 121,
          },
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to create new item' })
      );
    }
  }),

  //* Update Item
  rest.put('/api/item/:id', async (req, res, ctx) => {
    const existingItem = await req.json();
    await sleep(100);
    if (typeof existingItem) {
      return res(
        ctx.json({
          id: '58c89a9d-d702-45b2-8817-9b42afbf747c',
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: '5b972acd-7604-43d6-a7bb-23ab70d54059',
          name: 'beef steak',
          purchaseDate: '2022-02-18T16:00:00.000Z',
          expiryDate: '2023-03-02T16:00:00.000Z',
          storedIn: 'Freezer',
          quantity: '2 Flanks',
          trashed: false,
          category: {
            id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
            name: 'beef steak',
            dateCreated: '2023-01-18T16:00:00.000Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 121,
          },
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to update item' })
      );
    }
  }),

  //* Trash Item based on ID
  rest.patch('/api/item/:itemId', async (req, res, ctx) => {
    await sleep(100);
    const { itemId } = req.params;
    if (itemId.length > 10) {
      return res(
        ctx.json({
          id: '58c89a9d-d702-45b2-8817-9b42afbf747c',
          userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
          categoryId: '5b972acd-7604-43d6-a7bb-23ab70d54059',
          name: 'beef steak',
          purchaseDate: '2022-02-18T16:00:00.000Z',
          expiryDate: '2023-03-02T16:00:00.000Z',
          storedIn: 'Freezer',
          quantity: '2 Flanks',
          trashed: false,
          category: {
            id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
            name: 'beef steak',
            dateCreated: '2023-01-18T16:00:00.000Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 121,
          },
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to trash item' })
      );
    }
  }),

  //* Trash All Items
  rest.delete('/api/user/:userId/trash-all', async (req, res, ctx) => {
    await sleep(100);
    const { userId } = req.params;
    if (userId.length > 10) {
      return res(
        ctx.json([
          {
            id: '58c89a9d-d702-45b2-8817-9b42afbf747c',
            userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
            categoryId: '5b972acd-7604-43d6-a7bb-23ab70d54059',
            name: 'beef steak',
            purchaseDate: '2022-02-18T16:00:00.000Z',
            expiryDate: '2023-03-02T16:00:00.000Z',
            storedIn: 'Freezer',
            quantity: '2 Flanks',
            trashed: false,
            category: {
              id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
              name: 'beef steak',
              dateCreated: '2023-01-18T16:00:00.000Z',
              pantryDays: 0,
              fridgeDays: 3,
              freezerDays: 121,
            },
          },
          {
            id: 'ac6355ff-1ad0-468f-8349-a6110e4c267c',
            userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
            categoryId: '377e5868-4038-47ce-81ca-58e14109631f',
            name: 'Salmon',
            purchaseDate: '2023-03-22T16:00:00.000Z',
            expiryDate: '2023-03-25T16:00:00.000Z',
            storedIn: 'Fridge',
            quantity: '1 fillet',
            trashed: false,
            category: {
              id: '377e5868-4038-47ce-81ca-58e14109631f',
              name: 'Fish',
              dateCreated: '2023-03-23T13:40:07.478Z',
              pantryDays: 0,
              fridgeDays: 3,
              freezerDays: 31,
            },
          },
          {
            id: 'ca551653-210b-42eb-b406-1772166c5a3e',
            userId: 'd1714f0b-7d80-403f-b2eb-2549c93438d6',
            categoryId: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
            name: 'Apple Pie',
            purchaseDate: '2023-03-22T16:00:00.000Z',
            expiryDate: '2023-03-26T16:00:00.000Z',
            storedIn: 'Fridge',
            quantity: '1 Pie',
            trashed: true,
            category: {
              id: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
              name: 'fruit pie',
              dateCreated: '2023-01-18T16:00:00.000Z',
              pantryDays: 0,
              fridgeDays: 4,
              freezerDays: 182,
            },
          },
        ])
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to trash user items' })
      );
    }
  }),
  //////////////////////////////////////////////////////
  //// * CATEGORY
  //////////////////////////////////////////////////////

  //* Show All Category
  rest.get('/api/category', async (req, res, ctx) => {
    await sleep(100);
    return res(
      ctx.json([
        {
          id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
          name: 'beef steak',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 3,
          freezerDays: 121,
        },
        {
          id: '9cabaea1-2922-4c37-8826-8cd034e623b7',
          name: 'fresh juice',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 3,
          freezerDays: 365,
        },
        {
          id: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
          name: 'fruit pie',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 4,
          freezerDays: 182,
        },
        {
          id: '35e7ef99-27dc-4232-93d4-6a8c0ceb9dc9',
          name: 'uncooked fresh sausages',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 2,
          freezerDays: 62,
        },
        {
          id: 'e1dbcc88-50ff-4226-83e2-9231f4b9124a',
          name: 'cooked sausages',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 4,
          freezerDays: 62,
        },
      ])
    );
  }),

  //* Show By Category ID
  rest.get('/api/category/:id', async (req, res, ctx) => {
    await sleep(100);
    const { id } = req.params;
    if (id.length > 10) {
      return res(
        ctx.json({
          id: id,
          name: 'cooked sausages',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 4,
          freezerDays: 62,
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Category not found' })
      );
    }
  }),

  //* Find By Category Name
  rest.get(
    '/api/category/findByCategoryName/:categoryName',
    async (req, res, ctx) => {
      await sleep(100);
      const { categoryName } = req.params;
      if (categoryName.length > 3) {
        return res(
          ctx.json({
            id: '5b972acd-7604-43d6-a7bb-23ab70d54059',
            name: 'beef steak',
            dateCreated: '2023-01-18T16:00:00.000Z',
            pantryDays: 0,
            fridgeDays: 3,
            freezerDays: 121,
          })
        );
      } else {
        return res(
          ctx.delay(500), // adds a delay of 500ms before returning the response
          ctx.status(500), // sets the HTTP status code to 500
          ctx.json({ error: 'Category not found' })
        );
      }
    }
  ),
  //* Create Category
  rest.post('/api/category', async (req, res, ctx) => {
    const newCategory = await req.json();
    await sleep(100);
    if (typeof newCategory) {
      return res(
        ctx.json({
          id: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
          name: 'fruit pie',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 4,
          freezerDays: 182,
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to create new category' })
      );
    }
  }),

  //* Update Category
  rest.put('/api/category/:id', async (req, res, ctx) => {
    const { id } = req.params;
    await sleep(100);
    if (id) {
      return res(
        ctx.json({
          id: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
          name: 'fruit pie',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 4,
          freezerDays: 182,
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to update category' })
      );
    }
  }),

  //* Delete Category based on ID
  rest.delete('/api/category/:id', async (req, res, ctx) => {
    const { id } = req.params;
    await sleep(100);
    if (id) {
      return res(
        ctx.json({
          id: 'a9a4cf31-4ca3-4856-9ce5-662ec5fe3723',
          name: 'fruit pie',
          dateCreated: '2023-01-18T16:00:00.000Z',
          pantryDays: 0,
          fridgeDays: 4,
          freezerDays: 182,
        })
      );
    } else {
      return res(
        ctx.delay(500), // adds a delay of 500ms before returning the response
        ctx.status(500), // sets the HTTP status code to 500
        ctx.json({ error: 'Unable to delete category' })
      );
    }
  }),
];

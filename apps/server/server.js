//////////////////////////////////////////////////////
//// * Dependencies
//////////////////////////////////////////////////////
const express = require('express');
require('dotenv').config();
const forceHttps = require('express-force-https');
const cors = require('cors');

//////////////////////////////////////////////////////
//// * Config
//////////////////////////////////////////////////////

const app = express();
const port = process.env.PORT ?? 3500;
const path = require('path');

//////////////////////////////////////////////////////
//// * Middleware
//////////////////////////////////////////////////////

app.use(forceHttps);
app.use(express.static('../client/dist'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.set('trust proxy', true);

//////////////////////////////////////////////////////
//// * Controllers
//////////////////////////////////////////////////////
const UserController = require('./controller/UserController');
const ItemController = require('./controller/ItemController');
const CategoryController = require('./controller/CategoryController');
// const AwsS3Controller = require("./controller/AwsS3Controller");

app.use('/api/user', UserController);
app.use('/api/item', ItemController);
app.use('/api/category', CategoryController);

//////////////////////////////////////////////////////
//// * AWS Routes
//////////////////////////////////////////////////////
// app.post("/api/aws/uploadMultipleFiles", AwsS3Controller.createFiles);

//////////////////////////////////////////////////////
//// * General Routes
//////////////////////////////////////////////////////

app.get('/api', async (req, res) => {
  res.send('backend route is working');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

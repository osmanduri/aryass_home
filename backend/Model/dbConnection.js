const mongoose = require('mongoose');
require('dotenv').config({ path: './Config/.env' });

mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("Connection error:" + err));

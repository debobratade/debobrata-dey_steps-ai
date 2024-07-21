const express = require('express')
const cors =  require('cors')
const route = require('./routes/route')
const dotenv=require('dotenv')
const { sequelize_connection } = require('./config/sqlConnection');
const app=express()

app.use(express.json())
dotenv.config();
app.use(cors())
app.use('/', route)

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    
   // connect database
    sequelize_connection.authenticate().then(() => {
      console.log("Database connected!");
    }).catch(err => {
      console.error("Unable to connect to the database:", err);
    });
  });
  
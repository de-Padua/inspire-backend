require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const stripe = require("./routes/stripe");
const cors = require('cors')

const PORT = process.env.PORT || 3030;
//set db connection


app.get("/",(res,req)=>{
  req.json({data:"ok"})
})


app.use(cors({ origin: "https://inspire-chi.vercel.app", credentials: true }));


app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is on");
});


mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to the database");

  
})





app.use(stripe);
app.use(usersRoute);

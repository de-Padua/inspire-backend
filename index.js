require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const stripe = require("./routes/stripe");


app.use(cors({ origin: ["https://inspire-chi.vercel.app"], credentials: true }));


app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is on");
});

app.use(stripe);
app.use(usersRoute);

const PORT = process.env.PORT || 3030;
//set db connection

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connect to database");
});


app.get("/",(res,req)=>{
  req.json({data:"ok"})
})


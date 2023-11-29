require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const stripe = require("./routes/stripe");


const corsOptions = {
  origin: "https://inspire-chi.vercel.app", // Substitua pelo seu domínio
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));


const PORT = process.env.PORT || 3030;
//set db connection

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connect to database");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is on");
});

app.use(stripe);
app.use(usersRoute);
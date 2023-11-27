import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const mongoURI = process.env.MONGO;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });




const app = express();

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});

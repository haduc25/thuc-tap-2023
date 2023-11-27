import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
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


app.use("/api/user", userRouter)
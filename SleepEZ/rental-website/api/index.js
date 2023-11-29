import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

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

// Cho phép json làm đầu vào của server
app.use(express.json())

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
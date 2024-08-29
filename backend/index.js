import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const server = express();
const PORT = 4444;
const mongo =
  "mongodb+srv://minhajsam1233:minhajdatabase@demoproject1.aayeks8.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(mongo).then(console.log("Connected to monogDB"));

server.use(cors())
server.use(express.json());
server.use(bodyParser.json());

server.use("/api/user", userRouter);

server.listen(PORT, (err) => {
  if (err) {
    console.log("Something Went Wrong");
  } else {
    console.log("Listening on port ", PORT);
  }
});

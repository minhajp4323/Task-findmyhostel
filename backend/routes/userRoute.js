import express from "express";
import {
  allUser,
  createUser,
  getAllBills,
  getCurrentUserBills,
  getUserById,
  updateUser,
  updateUserBill,
} from "../controllers/userController.js";
import {
  createBill,
  filterBills,
  updateBill,
} from "../controllers/billController.js";
import { loginUser } from "../controllers/loginController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const app = express.Router();
app.post("/login", loginUser);
app.post("/create", createUser);
app.get("/filter", authenticate, filterBills);
app.get("/bills", authenticate, getAllBills);
app.get("/users", authenticate, allUser);
app.get("/mybills", authenticate, getCurrentUserBills);
app.patch('/mybills/:id', authenticate, updateUserBill)
app.get("/:id", authenticate, getUserById);
app.post("/bills", authenticate, createBill);
app.patch("/bills/:id", authenticate, updateBill);
app.patch("/:id", authenticate, updateUser);

export default app;

import express from "express";
import {
  createUser,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Create a new user
router.post("/create", createUser);

// Get all users
router.get("/all", allUser);

// Get a single user by ID
router.get("/:id", singleUser);

// Update a user by ID
router.put("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

export default router;

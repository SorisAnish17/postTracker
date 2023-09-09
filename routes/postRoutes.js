import express from "express";
import {
  createPost,
  allPosts,
  singlePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();
//createPost
router.post("/create", createPost);
//getAllPosts
router.get("/all", allPosts);
//getSinglePost
router.get("/:id", singlePost);
//updatePost
router.put("/:id", updatePost);
//deletePost
router.delete("/:id", deletePost);

export default router;

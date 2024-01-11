import express from "express";

import PostService from "../services/post.service";
const postController = express.Router();

const postService = new PostService();

postController.get("/", postService.getPost);
postController.get("/:id", postService.getPostByIdUser);
export default postController;

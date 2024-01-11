import { Express } from "express";
import userController from "./user.controller";
import postController from "./post.controller";

const Router = (server: Express) => {
  server.use("/api/v1/user", userController);
  server.use("/api/v1/post", postController);
};

export default Router;

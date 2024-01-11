import express, { Request, Response } from "express";

import * as fs from "fs";
const server = express();
import * as path from "path";

server.use(express.json());
server.use(express.static("public"));
class PostService {
  constructor() {}

  async getPost(req: Request, res: Response) {
    const data = fs.readFileSync(path.join("public/post.json"), "utf8");
    const user = JSON.parse(data);
    res.status(200).json(user);
  }
  async getPostByIdUser(req: Request, res: Response) {
    const data = fs.readFileSync(path.join("public/post.json"), "utf8");
    const postData = JSON.parse(data);
    const postUserId = req.params.id;
    const postId = postData.filter((i: any) => 
      i.userId == postUserId
    );
    res.status(200).json(postId);
  }
}

export default PostService;

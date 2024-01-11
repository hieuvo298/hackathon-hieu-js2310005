import express, { Request, Response, urlencoded } from "express";
import * as fs from "fs";
const server = express();
import * as path from "path";
server.use(urlencoded());

server.use(express.json());
server.use(express.static("public"));
class UserService {
  constructor() {}

  async getUser(req: Request, res: Response) {
    const data = fs.readFileSync(path.join("public/user.json"), "utf8");
    const users = JSON.parse(data);
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const data = fs.readFileSync(path.join("public/user.json"), "utf8");
    const users = JSON.parse(data);
    const user = users.find((u: any) => u.id == req.params.id);
    const userId = req.params.id;
    if (user) {
      const dataPost = fs.readFileSync(path.join("public/post.json"), "utf8");
      const postData = JSON.parse(dataPost);
      const userPost = postData.filter((item: any) => {
        item.userId == userId;
      });
      const userWithPosts = { ...user, post: userPost };
      res.status(200).json(userWithPosts);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
  async getUserByName(req: Request, res: Response) {
    const data = fs.readFileSync(path.join("public/user.json"), "utf8");
    const user = JSON.parse(data);
    const searchName = req.params.name;
    const checkSearchName = user.filter((item: any) =>
      item.name.includes(searchName)
    );
    if (checkSearchName) {
      res.status(200).json(checkSearchName);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  }
  async deleteUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const data = fs.readFileSync(path.join("public/user.json"), "utf-8");
    const users = JSON.parse(data);

    const userIndex = users.findIndex((u: any) => u.id == userId);
    console.log(userId);
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];
      fs.writeFileSync(path.join("public/user.json"), JSON.stringify(users));

      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
  async postNewUser(req: Request, res: Response) {
    const newUser = req.body;
    const data = fs.readFileSync(path.join("public/user.json"), "utf-8");
    const users = JSON.parse(data);

    if (users) {
      users.push(newUser);
      fs.writeFileSync(path.join("public/user.json"), JSON.stringify(users));

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const updatedUser = req.body;
    const data = fs.readFileSync(path.join("public/user.json"), "utf-8");
    const users = JSON.parse(data);
    console.log(updatedUser);
    const userIndex = users.findIndex((u: any) => u.id == userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      fs.writeFileSync(path.join("public/user.json"), JSON.stringify(users));

      res
        .status(200)
        .json({ message: "User updated successfully", user: users[userIndex] });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
}

export default UserService;

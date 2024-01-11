import express, { urlencoded } from "express";
import * as fs from "fs";
const server = express();
const PORT = 9000;
import Router from "./controllers";
server.use(urlencoded());

server.use(express.static("public"));

Router(server);

server.listen(PORT, () => {
  console.log(`sever listening on ${PORT},http://localhost:${PORT}`);
});

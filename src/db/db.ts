import * as dotenv from "dotenv";
import {
  createServer,
  IncomingMessage,
  ServerResponse,
  Server,
} from "node:http";
import process from "node:process";
import { defaultHeaders, RequestMethod, StatusCode } from "../constants";
import { IUser } from "../store";
import { handleServerError } from "../utils";
import { isUsersRoute } from "./utils";

const PORT = process.env.DB_PORT || 7777;
dotenv.config();

const createDB = (): Server => {
  let users: Record<string, IUser> = {};

  return createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const buffers: Buffer[] = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const [apiPath, usersPath] = (req.url || "")
        .split("/")
        .filter((value) => value);

      if (
        isUsersRoute(apiPath, usersPath) &&
        req.method === RequestMethod.GET
      ) {
        res.writeHead(StatusCode.OK, defaultHeaders);
        res.end(JSON.stringify(users));
        return;
      }

      if (
        isUsersRoute(apiPath, usersPath) &&
        req.method === RequestMethod.PUT
      ) {
        const updatedUsers = buffers.length
          ? JSON.parse(buffers.toString())
          : {};

        users = updatedUsers;

        res.writeHead(StatusCode.NO_CONTENT, defaultHeaders);
        res.end();
        return;
      }

      res.writeHead(StatusCode.NOT_FOUND, defaultHeaders);
      res.end();
    } catch {
      handleServerError(res);
    }
  });
};

export const startDB = () => {
  const db = createDB();

  db.listen(PORT, () => {
    console.log(`DB is running on port ${PORT}`);
  });
};

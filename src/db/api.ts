import * as dotenv from "dotenv";
import { request } from "node:http";
import { HOSTNAME, RequestMethod, Route } from "../constants";
import { defaultHeaders } from "../constants";
import { IUser } from "../store/users";

const DB_PORT = process.env.DB_PORT || 7777;
dotenv.config();

export const getUsersData = async (): Promise<Record<string, IUser>> =>
  new Promise((resolve) => {
    const options = {
      hostname: HOSTNAME,
      port: DB_PORT,
      path: `/${Route.users}`,
      method: RequestMethod.GET,
      headers: {
        ...defaultHeaders,
      },
    };

    const req = request(options, async (response: any) => {
      const buffers: Buffer[] = [];

      for await (const chunk of response) {
        buffers.push(chunk);
      }

      const data = buffers.length ? JSON.parse(buffers.toString()) : {};

      resolve(data);
    });

    req.end();
  });

export const updateUsersData = async (
  users: Record<string, IUser>
): Promise<void> =>
  new Promise((resolve) => {
    const options = {
      hostname: HOSTNAME,
      port: DB_PORT,
      path: `/${Route.users}`,
      method: RequestMethod.PUT,
      headers: {
        ...defaultHeaders,
      },
    };

    const req = request(options, () => {
      resolve();
    });

    req.write(JSON.stringify(users));
    req.end();
  });

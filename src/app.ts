import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { defaultHeaders, RequestMethod } from "./constants";
import { handleRequest } from "./routes";
import { handleServerError } from "./utils";

export const app = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const buffers: Buffer[] = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const body = buffers.length ? JSON.parse(buffers.toString()) : {};

      const { data, code, message } = handleRequest(
        req.url,
        req.method as RequestMethod,
        body
      );

      const response = data ? { data, message } : { message };

      res.writeHead(code, defaultHeaders);
      res.end(JSON.stringify(response));
    } catch {
      handleServerError(res);
    }
  }
);

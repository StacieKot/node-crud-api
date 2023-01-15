import * as dotenv from "dotenv";
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { defaultHeaders, RequestMethod } from "./constants";
import { handleRequest } from "./routes";
import { handleServerError, isMulti } from "./utils";
import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";
import { startDB } from "./db/db";
import { createBalancer } from "./balancer";

const PORT = process.env.PORT || 4000;

const numCPUs = cpus().length;

dotenv.config();

export const app = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      console.log(`Request is handling on port ${process.env.port || PORT}`);

      const buffers: Buffer[] = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const body = buffers.length ? JSON.parse(buffers.toString()) : {};

      const { data, code, message } = await handleRequest(
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

export const startApp = () => {
  if (isMulti()) {
    if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running`);

      for (let i = 1; i <= numCPUs; i++) {
        cluster.fork({ port: Number(PORT) + i });
      }

      cluster.on("exit", (worker) => {
        console.log(`worker ${worker.process.pid} died`);
      });

      const balancer = createBalancer(Number(PORT));

      balancer.listen(PORT, () => {
        console.log(`Balancer is running on port ${PORT}`);
      });

      startDB();
    } else {
      app.listen(process.env.port, () => {
        console.log(`Worker is running on port ${process.env.port}`);
      });
    }
  } else {
    startDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
};

import {
  createServer,
  IncomingMessage,
  ServerResponse,
  request,
  Server,
} from "node:http";
import { defaultHeaders } from "./constants";
import { handleServerError } from "./utils";
import { cpus } from "node:os";
import { HOSTNAME } from "./constants/app";

const numCPUs = cpus().length;

export const createBalancer = (masterPort: number): Server => {
  let currentWorker = 1;

  return createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const buffers: Buffer[] = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const options = {
        hostname: HOSTNAME,
        port: masterPort + currentWorker,
        path: req.url,
        method: req.method,
        headers: {
          ...defaultHeaders,
        },
      };

      currentWorker = currentWorker === numCPUs ? 1 : currentWorker + 1;

      const proxyRequest = request(options, async (response: any) => {
        const data: Buffer[] = [];

        for await (const chunk of response) {
          data.push(chunk);
        }
        res.writeHead(response.statusCode, defaultHeaders);
        res.end(data.toString());
      });

      if (buffers.length) {
        proxyRequest.write(buffers.toString());
      }

      proxyRequest.end();
    } catch {
      handleServerError(res);
    }
  });
};

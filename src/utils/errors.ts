import { StatusCode, StatusMessage } from "../constants";
import { ServerResponse } from "node:http";

export const handleServerError = (res: ServerResponse): void => {
  res.writeHead(StatusCode.SERVER_ERROR, StatusMessage.serverError);
  res.end();
};

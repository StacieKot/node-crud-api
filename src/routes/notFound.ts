import { StatusCode, StatusMessage } from "../constants";
import { IResponse } from "./types";

export const handleNotExistingRoute = (): IResponse => ({
  code: StatusCode.NOT_FOUND,
  message: StatusMessage.notFound,
});

import { StatusCode, StatusMessage } from "../constants";
import { IUser } from "../store/users";

export const getResponseData = (
  code: StatusCode,
  message: StatusMessage | string,
  data?: IUser | IUser[]
) => ({ code, message, data });

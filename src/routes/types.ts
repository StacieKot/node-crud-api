import { StatusCode, StatusMessage } from "../constants";
import { IUser } from "../store/users";

export interface IResponse {
  code: StatusCode;
  message: StatusMessage | string;
  data?: IUser | IUser[];
}

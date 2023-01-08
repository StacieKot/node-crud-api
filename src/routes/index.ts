import { RequestMethod, Route } from "../constants";
import { handleUserRequest } from "./users";
import { IUser } from "../store/users";
import { handleNotExistingRoute } from "./notFound";
import { IResponse } from "./types";

const handlersConfig = {
  [Route.users]: handleUserRequest,
};

export const handleRequest = (
  path = "",
  method: RequestMethod,
  body: IUser = {} as IUser
): IResponse => {
  const [api, users, userId, ...rest] = path
    .split("/")
    .filter((value) => value);

  const handler =
    (!rest.length && handlersConfig[`${api}/${users}` as Route]) ||
    handleNotExistingRoute;

  return handler(method, body, userId);
};

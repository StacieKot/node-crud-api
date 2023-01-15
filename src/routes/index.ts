import { RequestMethod, Route } from "../constants";
import { handleUserRequest } from "./users";
import { IUser } from "../store/users";
import { handleNotExistingRoute } from "./notFound";
import { IResponse } from "./types";
import { getUsersData, updateUsersData } from "../db";

const handlersConfig = {
  [Route.users]: handleUserRequest,
};

export const handleRequest = async (
  path = "",
  method: RequestMethod,
  body: IUser = {} as IUser
): Promise<IResponse> => {
  const [apiPath, usersPath, userId, ...rest] = path
    .split("/")
    .filter((value) => value);

  const handler =
    (!rest.length && handlersConfig[`${apiPath}/${usersPath}` as Route]) ||
    handleNotExistingRoute;

  const users = await getUsersData();

  const response = handler(method, body, users, userId);

  updateUsersData(users);

  return response;
};

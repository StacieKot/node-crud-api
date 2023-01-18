import { Route } from "../constants";

export const isUsersRoute = (apiPath: string, usersPath: string): boolean =>
  `${apiPath}/${usersPath}` === Route.users;

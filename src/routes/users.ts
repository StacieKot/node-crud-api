import { RequestMethod, StatusCode, StatusMessage } from "../constants";
import { users } from "../store";
import { getResponseData, getUUID, isValidUUID, validateUser } from "../utils";
import { IUser } from "../store/users";
import { IResponse } from "./types";

export const getUsers = (): IResponse => {
  return {
    data: Object.values(users),
    message: StatusMessage.Ok,
    code: StatusCode.OK,
  };
};

export const getUser = (userId = ""): IResponse => {
  if (!isValidUUID(userId)) {
    return getResponseData(StatusCode.BAD_REQUEST, StatusMessage.badUUID);
  }

  const user = users[userId];

  return user
    ? getResponseData(StatusCode.OK, StatusMessage.Ok, user)
    : getResponseData(StatusCode.NOT_FOUND, StatusMessage.userNotFound);
};

export const createUser = (user = {} as IUser, userId = ""): IResponse => {
  if (userId) {
    return getResponseData(
      StatusCode.BAD_REQUEST,
      StatusMessage.uuidIsNotRequired
    );
  }

  const { isValid, errorMessage } = validateUser(user);

  if (!isValid || userId) {
    return getResponseData(StatusCode.BAD_REQUEST, errorMessage);
  }

  const uuid = getUUID(Object.keys(users));
  const { username, age, hobbies } = user;
  users[uuid] = { username, age, hobbies, id: uuid };

  return getResponseData(
    StatusCode.CREATED,
    StatusMessage.Created,
    users[uuid]
  );
};

export const updateUser = (user = {} as IUser, userId = "") => {
  if (!isValidUUID(userId)) {
    return getResponseData(StatusCode.BAD_REQUEST, StatusMessage.badUUID);
  }

  const { isValid, errorMessage } = validateUser(user);

  if (!isValid) {
    return getResponseData(StatusCode.BAD_REQUEST, errorMessage);
  }

  const userData = users[userId];

  if (!userData) {
    return getResponseData(StatusCode.NOT_FOUND, StatusMessage.userNotFound);
  }

  users[userId] = { ...user, id: userData.id };

  return getResponseData(StatusCode.OK, StatusMessage.Ok, users[userId]);
};

export const deleteUser = (userId = ""): IResponse => {
  if (!isValidUUID(userId)) {
    return getResponseData(StatusCode.BAD_REQUEST, StatusMessage.badUUID);
  }

  const user = users[userId];

  if (!user) {
    return getResponseData(StatusCode.NOT_FOUND, StatusMessage.userNotFound);
  }

  delete users[userId];

  return { code: StatusCode.NO_CONTENT, message: StatusMessage.Deleted };
};

export const handleUserRequest = (
  method: RequestMethod,
  user: IUser,
  userId?: string
): IResponse => {
  switch (method) {
    case RequestMethod.GET:
      const handler = userId ? getUser : getUsers;
      return handler(userId);
    case RequestMethod.POST:
      return createUser(user, userId);
    case RequestMethod.PUT:
      return updateUser(user, userId);
    case RequestMethod.DELETE:
      return deleteUser(userId);
  }
};

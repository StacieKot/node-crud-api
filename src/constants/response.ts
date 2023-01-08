export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum StatusMessage {
  Ok = "OK",
  Created = "CREATED",
  Deleted = "DELETED",
  badUUID = "Invalid UUID",
  userNotFound = "User not found",
  notFound = "The endpoint you are trying to reach doesn't exist",
  serverError = "Internal Server Error",
  uuidIsNotRequired = "User ID is not required",
}

export const defaultHeaders = { "Content-Type": "application/json" };

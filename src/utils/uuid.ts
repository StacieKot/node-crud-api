import { randomUUID } from "crypto";
export const isValidUUID = (uuid: string): boolean => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(uuid);
};

export const getUUID = (UUIDs: string[]): string => {
  let uuid: string;

  do {
    uuid = randomUUID();
  } while (UUIDs.some((value) => value === uuid));

  return uuid;
};

import { IUser } from "../store";

export const validationMessage = {
  fieldIsRequired: `field is required`,
  invalidHobbiesFormat:
    "Invalid format of user's hobbies field (array of strings or empty array is allowed)",
};

export const validateUser = ({
  username,
  age,
  hobbies,
}: IUser): { isValid: boolean; errorMessage: string } => {
  const errors = [];

  if (!username) {
    errors.push(`username ${validationMessage.fieldIsRequired}`);
  }

  if ((!age && age !== 0) || age > 150) {
    errors.push(`age ${validationMessage.fieldIsRequired}`);
  }

  if (!hobbies) {
    errors.push(`hobbies ${validationMessage.fieldIsRequired}`);
  }

  if (
    hobbies &&
    (!Array.isArray(hobbies) ||
      hobbies.some((hobby) => typeof hobby !== "string"))
  ) {
    errors.push(validationMessage.invalidHobbiesFormat);
  }

  return {
    isValid: !errors.length,
    errorMessage: getErrorMessage(errors),
  };
};

const getErrorMessage = (errors: string[] = []) => errors.join(", ");

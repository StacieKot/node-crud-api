export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: Record<string, IUser> = {};
// export const users: Record<string, IUser> = {
//   "24d8ab3d-6a3f-41c0-b112-6845287958c8": {
//     username: "Anna",
//     age: 22,
//     hobbies: ["photo", "travel"],
//     id: "24d8ab3d-6a3f-41c0-b112-6845287958c8",
//   },
//   "6555ff66-85f0-426d-a52d-31d2dbfe59ca": {
//     username: "Maxim",
//     age: 30,
//     hobbies: ["yoga"],
//     id: "6555ff66-85f0-426d-a52d-31d2dbfe59ca",
//   },
// };

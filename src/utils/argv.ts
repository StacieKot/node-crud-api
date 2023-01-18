import { argv } from "node:process";

export const isMulti = () => argv.find((arg) => arg === "--cluster=enable");

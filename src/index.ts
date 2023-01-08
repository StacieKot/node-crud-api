import * as dotenv from "dotenv";
import process from "node:process";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

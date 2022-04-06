import { config } from "dotenv";

import { app } from "./app";

config();

const port = process.env.PORT || 3333;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

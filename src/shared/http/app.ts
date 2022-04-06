import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from "cors";

import "../container";
import { routes } from "./routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorHandler);

export { app };

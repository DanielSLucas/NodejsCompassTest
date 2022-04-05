import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";

import "../container";
import { CelebrateError } from "celebrate";
import { routes } from "./routes";

import { AppError } from "../errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    return response.status(400).json({
      status: "error",
      message: err.details.get("body")?.details[0].message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export { app };

import { CelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    const message =
      err.details.get("body")?.details[0].message ||
      err.details.get("params")?.details[0].message ||
      err.details.get("query")?.details[0].message;

    return response.status(400).json({
      status: "error",
      message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}

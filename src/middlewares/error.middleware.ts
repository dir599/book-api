
import type { Request, Response, NextFunction } from "express";

import handlePrismaError from "../utils/prismaError.js";
import ApiError from "../utils/apiError.js";

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let finalError: ApiError;

  if (error instanceof ApiError) {
    finalError = error;
  } else {
    const prismaError = handlePrismaError(error);

    if (prismaError) {
      finalError = prismaError;
    } else {
      console.error(error);

      finalError = new ApiError(
        500,
        "Internal server error",
        false
      );
    }
  }

  res.status(finalError.statusCode).json({
    success: false,
    message: finalError.message,
  });
};

export default errorHandler;

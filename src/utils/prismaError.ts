
import { Prisma } from "../generated/prisma/client.js";
import ApiError from "./apiError.js";


const handlePrismaError = (error: unknown): ApiError | null => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = error.meta?.["target"];
        const field = Array.isArray(target)
          ? target.join(", ")
          : typeof target === "string"
            ? target
            : "field";

        return new ApiError(
          409,
          `A record with this ${field} already exists`
        );
      }

      case "P2025":
        return new ApiError(404, "Record not found");

      case "P2003":
        return new ApiError(
          400,
          "Invalid reference: related record does not exist"
        );

      case "P2014":
        return new ApiError(
          400,
          "The operation violates a required relation"
        );

      default:
        return null;
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new ApiError(
      503,
      "Database is currently unavailable"
    );
  }

  return null;
};

export default handlePrismaError;

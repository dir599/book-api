
import prisma from "../lib/prisma.js";
import ApiError from "../utils/apiError.js";
import { CreateBook } from "../validators/book.validator.js";

export const createBookService = async (data: CreateBook) => {
  const existingBook = await prisma.book.findFirst({
    where: {
      title: data.title,
      author: data.author,
    },
  });
  if (existingBook) {
    throw new ApiError(409, "Book already exist");
  }
  return await prisma.book.create({
    data,
  });
};

export const getBook = async () => {
  const book = await prisma.book.findMany({
   orderBy: {
     id: "desc"
    }
  });
  return book;
};

export const getBookById = async (id: number) => {

  const book = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!book) {
    throw new ApiError(404, "Book doesn't found");
  }
  return book;
};

export const deleteBook = async (id: number) => {
  const book = await prisma.book.delete({
    where: {
      id: Number(id),
    },
  });
  return book;
};

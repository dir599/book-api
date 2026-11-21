import prisma from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

// interface createBook {
// title: string;
//   author: string;
//   description: string;
//   published?: boolean;
//   price: number;
// }
type CreateBook = Prisma.BookCreateInput;

export const createBookService = async (data: CreateBook) => {
   return await prisma.book.create({
    data,
   })
};

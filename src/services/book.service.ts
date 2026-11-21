import prisma from "../lib/prisma.js";
import ApiError from "../utils/apiError.js";
import { CreateBook } from "../validators/book.validator.js";




export const createBookService = async (data: CreateBook) => {
   const existingBook = await prisma.book.findFirst({
      where: {
         title: data.title,
         author: data.author
      }
   })
   if(existingBook){
     throw new ApiError(409,"Book already exist")
   }
   return await prisma.book.create({
    data,
   })
};

import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { createBookSchema } from "../validators/book.validator.js";
import { createBookService } from "../services/book.service.js";




export const createBookController =  asyncHandler( async (req: Request, res: Response) => {
  const bookFill = createBookSchema.safeParse(req.body)
  if(!bookFill.success){
    res.status(400).json({
      success: false,
      error: bookFill.error.message
    })
    return
  }
  const book = await createBookService(bookFill.data)
  res.status(201).json({
    success: true,
    message: `Book created successfully.`,
    data: book
  })
 
});

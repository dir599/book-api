import { Request, Response } from "express";
import { createBookService } from "../services/book.service.js";

export const createBookController = async (req: Request, res: Response) => {
  const { title, author, description, price, published } = req.body;
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof description !== "number" ||
    typeof price !== "number" ||
    (typeof published !== "boolean" && typeof published !== "undefined")
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid input",
    });
    return
}
const book = await createBookService({
  title: title.trim(),
  author: author.trim(),
  description,
  price,
  published
})

return res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book
})
};

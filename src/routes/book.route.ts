import { Router } from "express";
import { createBookController, deleteBookController, getBookByIdController, getBookController } from "../controllers/book.controller.js";


const router =  Router()

router.post("/", createBookController )
router.get("/allBooks", getBookController)
router.get("/byId/:id", getBookByIdController)
router.delete("/:id", deleteBookController)

export default router
import { Router } from "express";
import { createBookController } from "../controllers/book.controller.js";


const router =  Router()

router.post("/", createBookController )

export default router
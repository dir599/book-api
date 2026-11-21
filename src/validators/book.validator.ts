import {z} from "zod"

 export const createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1,"Author is required"),
    description: z.number().min(1,"It is optional"),
    price: z.string().min(1,"Price is required"),
    published: z.string().min(1,"Published is required")

})

export type CreateBook = z.infer<typeof createBookSchema>
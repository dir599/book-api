import {z} from "zod"

 export const createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1,"Author is required"),
    description: z.string().min(1,"It is optional"),
    price: z.number().min(0,"Price is required"),
    published: z.boolean().optional()

})

export type CreateBook = z.infer<typeof createBookSchema>
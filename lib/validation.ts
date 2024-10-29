import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(2, {
        message: "name must be at least 2 characters.",
    })
    .max(30, {
        message: "name must be at most 30 characters"
    }),

    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'Invalid Phone Number') 
})

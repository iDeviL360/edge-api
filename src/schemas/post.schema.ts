import { z } from 'zod';

export const postSchema = z.object({
    title: z.string(),
    body: z.string(),
    userId: z.number()
})
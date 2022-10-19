import { z } from 'zod';

export const createPostSchema = z.object({
    body: z.object({
        title: z.string().min(4, 'Title must be at least 4 characters'),
        body: z.string().min(6, 'Title must be at least 6 characters'),
        userId: z.number().nonnegative()
    })
})


export const updatePostSchema = z.object({
    body: z.object({
        title: z.string().min(4, 'Title must be at least 4 characters').optional(),
        body: z.string().min(6, 'Title must be at least 6 characters').optional(),
        userId: z.number().nonnegative().optional()
    }),
    params: z.object({
        postId: z.string().min(1)
    })
})
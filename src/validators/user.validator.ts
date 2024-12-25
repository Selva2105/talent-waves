import { z } from 'zod';

import { validateRequest } from '@/error/Validation';


const createUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(3, { message: 'Username is required' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(15, { message: 'Password must be at most 15 characters long' })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter',
        })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter',
        })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[\W_]/, { message: 'Password must contain at least one symbol' }),
    fullName: z.string().min(3, { message: 'Full name is required' }),
    userType: z.enum(['CANDIDATE', 'EMPLOYER'], {
        message: 'User type must be either CANDIDATE or EMPLOYER',
    }),
});

export const createUserValidator = validateRequest({
    body: createUserSchema,
});
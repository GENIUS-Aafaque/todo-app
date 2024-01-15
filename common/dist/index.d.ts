import { z } from "zod";
export declare const userValidator: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const todoValidator: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export type UserCredentials = z.infer<typeof userValidator>;
export type TodoInput = z.infer<typeof todoValidator>;

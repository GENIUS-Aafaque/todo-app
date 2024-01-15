import { z } from "zod";

export const userValidator = z.object ({
    username: z.string().min(1).max(25),
    password: z.string().min(4).max(15)
  });

export const todoValidator = z.object ({
    title: z.string().min(1).max(30),
    description: z.string().min(1).max(100)
  });

export type UserCredentials = z.infer<typeof userValidator>;
export type TodoInput = z.infer<typeof todoValidator>;
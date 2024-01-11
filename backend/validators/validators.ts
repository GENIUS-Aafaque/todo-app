import { z } from "zod";

export const userValidator = z.object ({
    username: z.string().min(1).max(25),
    password: z.string().min(4).max(15)
  })

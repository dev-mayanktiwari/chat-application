import { z } from "zod";

export const UserType = z.object({
  fullName: z.string(),
  username: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
});

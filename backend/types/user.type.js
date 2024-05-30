import { z } from zod;

export const UserType = z.object({
  fullname: z.string().nonempty(),
  username: z.string().nonempty(),
  password: z.string().min(6),
  confirmPassword: z.string.min(6),
  profilePicture: z.string().url(),
})


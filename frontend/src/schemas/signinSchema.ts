import { z } from "zod";

const signinSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "the password should at least be 8 charachters" }),
});

type SigninSchemaType = z.infer<typeof signinSchema>;

export { signinSchema };
export type { SigninSchemaType };

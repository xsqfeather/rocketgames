import { z } from "zod";
import { createTypeAlias, zodToTs } from "zod-to-ts";

export const LoginInputSchema = z.object({
  firstName: z.string().min(3).max(32),
  email: z.string().email(),
  deviceOS: z.number().int().min(0).max(1),
});

export const { node } = zodToTs(LoginInputSchema, "LoginInput");
export const LoginInput = createTypeAlias(
  node,
  "LoginInput",
  "This is a comment"
);

export type LoginInputType = typeof LoginInput;

export const registerInputSchema = z.object({
  firstName: z.string().min(3).max(32),
  email: z.string().email(),
  deviceOS: z.number().int().min(0).max(1),
});

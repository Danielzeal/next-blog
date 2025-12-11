import { z } from "zod";

export const BlogSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(10, { message: "Title is too short" })
    .max(150, { message: "Title is too long" }),
  content: z.string().min(100, { message: "Content is too short" }),
  coverImage: z.string().optional(),
  isPublished: z.boolean(),
  tags: z
    .array(z.string())
    .min(2, { message: "Minimun of 2 tag can be added" })
    .max(4, { message: "Maximum of 4 tags can be added" }),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;

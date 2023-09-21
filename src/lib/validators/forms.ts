import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export type CourseCreationRequest = z.infer<typeof formSchema>;

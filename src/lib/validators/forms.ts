import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const descriptionFormSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export type CourseCreationRequest = z.infer<typeof formSchema>;
export type DescriptionRequest = z.infer<typeof descriptionFormSchema>;

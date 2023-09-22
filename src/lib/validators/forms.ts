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

export const imageFormSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const categoryFormSchema = z.object({
  categoryId: z.string().min(1),
});

export type CourseCreationRequest = z.infer<typeof formSchema>;
export type DescriptionRequest = z.infer<typeof descriptionFormSchema>;
export type ImageRequest = z.infer<typeof imageFormSchema>;
export type CategoryRequest = z.infer<typeof categoryFormSchema>;

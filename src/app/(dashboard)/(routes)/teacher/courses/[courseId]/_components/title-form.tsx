"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CourseCreationRequest, formSchema } from "@/lib/validators/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  initialData: {
    title: string;
  };

  courseId: string;
}

export default function TitleForm({ initialData, courseId }: Props) {
  const form = useForm<CourseCreationRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const { toast } = useToast();
  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CourseCreationRequest) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: "Course Updated",
        description: "The title was updated",
        variant: "default",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        title: "Something broke",
        description: "An error occurred, try again 🥳",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g. `React`"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={!isEditing || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

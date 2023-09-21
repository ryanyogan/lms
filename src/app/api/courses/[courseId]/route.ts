import { db } from "@/lib/db";
import { formSchema } from "@/lib/validators/forms";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Params {
  params: {
    courseId: string;
  };
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized 🚫", { status: 401 });
    }

    if (!courseId) {
      return new NextResponse("CourseID is required 🚫", { status: 400 });
    }

    const body = await req.json();
    const { title } = formSchema.parse(body);

    if (!title) {
      return new NextResponse("You need a title... 🚫", { status: 400 });
    }

    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log(`[COURSES] ${error}`);
    return new NextResponse("The Server Barfed 🤮", { status: 500 });
  }
}

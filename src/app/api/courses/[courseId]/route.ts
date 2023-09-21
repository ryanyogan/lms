import { db } from "@/lib/db";
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

    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log(`[COURSES] ${error}`);
    return new NextResponse("The Server Barfed 🤮", { status: 500 });
  }
}

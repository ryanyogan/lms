import { db } from "@/lib/db";
import { formSchema } from "@/lib/validators/forms";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized 🚫", { status: 401 });
    }

    const body = await req.json();
    const { title } = formSchema.parse(body);

    if (!title) {
      return new NextResponse("You need a title... 🚫", { status: 400 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log(`[COURSES] ${error}`);
    return new NextResponse("The Server Barfed 🤮", { status: 500 });
  }
}

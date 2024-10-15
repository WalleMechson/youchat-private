import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;
    if (!name || !email || !password) {
      return new NextResponse("Register-Route-Missing-Parameters", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return new NextResponse("Register-Route-Failed-To-Create-User", {
        status: 502,
      });
    }
  } catch (error: any) {
    console.log(error, "Register-Route-Internal-Error");
    return new NextResponse("Register-Route-Internal-Error", { status: 500 });
  }
}

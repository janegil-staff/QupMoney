import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import Goal from "@/models/Goal";

export async function GET(req) {
  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const goals = await Goal.find({ user: token.id });
  return NextResponse.json(goals);
}

export async function POST(req) {
  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { title, targetAmount, currentAmount, month } = await req.json();
  console.log("Received:", { title, targetAmount, currentAmount, month });
  try {
    const goal = await Goal.create({
      title,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount),
      month,
      user: token.id,
    });

    return NextResponse.json(goal);
  } catch (err) {
    console.error("Goal creation error:", err);
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // ✅ extract ID from URL

  await connectDB();

  const deleted = await Goal.findOneAndDelete({
    _id: id,
    user: token.id,
  });

  if (!deleted) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import Goal from "@/models/Goal";

export async function DELETE(req, context) {
  try {
    // Await the async params in Next.js 16
    const params = await context.params;

    if (!params || !params.id) {
      return NextResponse.json(
        { error: "Goal ID not found in params" },
        { status: 400 }
      );
    }

    const goalId = params.id;
    console.log("Goal ID:", goalId);

    if (!goalId) {
      return NextResponse.json({ error: "Missing goal ID" }, { status: 400 });
    }

    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const deleted = await Goal.findOneAndDelete({
      _id: goalId,
      user: token.id,
    });

    if (!deleted) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/goals/[id] error:", err);

    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, context) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing goal ID" }, { status: 400 });
  }

  const token = await getToken({ req });
  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, targetAmount, currentAmount, month } = await req.json();

  await connectDB();

  const updated = await Goal.findOneAndUpdate(
    { _id: id, user: token.id },
    { title, targetAmount, currentAmount, month },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

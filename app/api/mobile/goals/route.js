import { NextResponse } from "next/server";
import Goal from "@/models/Goal"; // Adjust path
import { requireAuth } from "@/lib/auth-utils"; // Adjust path
import { connectDB } from "@/lib/db";

// GET /api/mobile/goals
export async function GET(request) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const goals = await Goal.find({ user: auth.user._id }).sort({ month: -1 });

    return NextResponse.json(goals);
  } catch (error) {
    console.error("Get goals error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST /api/mobile/goals
export async function POST(request) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const { title, targetAmount, currentAmount, month } = await request.json();

    // Validation
    if (!title || !targetAmount || !month) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 },
      );
    }

    // Validate month format (YYYY-MM)
    const monthRegex = /^\d{4}-\d{2}$/;
    if (!monthRegex.test(month)) {
      return NextResponse.json(
        { message: "Month must be in format YYYY-MM" },
        { status: 400 },
      );
    }

    const goal = await Goal.create({
      user: auth.user._id,
      title,
      targetAmount,
      currentAmount: currentAmount || 0,
      month,
    });

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    console.error("Create goal error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

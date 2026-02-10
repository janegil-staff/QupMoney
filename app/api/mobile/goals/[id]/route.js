import { NextResponse } from "next/server";
import Goal from "@/models/Goal"; // Adjust path
import { requireAuth } from "@/lib/auth-utils"; // Adjust path
import { connectDB } from "@/lib/db";

// GET /api/mobile/goals/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const goal = await Goal.findById(params.id);

    if (!goal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== auth.user._id.toString()) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Get goal error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT /api/mobile/goals/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const goal = await Goal.findById(params.id);

    if (!goal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== auth.user._id.toString()) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate month format if provided
    if (body.month) {
      const monthRegex = /^\d{4}-\d{2}$/;
      if (!monthRegex.test(body.month)) {
        return NextResponse.json(
          { message: "Month must be in format YYYY-MM" },
          { status: 400 },
        );
      }
    }

    const updatedGoal = await Goal.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedGoal);
  } catch (error) {
    console.error("Update goal error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE /api/mobile/goals/[id]
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const goal = await Goal.findById(params.id);

    if (!goal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== auth.user._id.toString()) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await goal.deleteOne();

    return NextResponse.json({
      message: "Goal deleted",
      id: params.id,
    });
  } catch (error) {
    console.error("Delete goal error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Transaction from "@/models/Transaction";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming transaction body:", body);

    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const transaction = await Transaction.create({
      ...body,
      user: session.user.id,
    });

    return NextResponse.json(transaction);
  } catch (err) {
    console.error("Transaction error:", err);
    return NextResponse.json(
      { error: "Failed to create transaction", details: err.errors },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const transactions = await Transaction.find({ user: session.user.id }).sort({
    date: -1,
  });

  return NextResponse.json(transactions);
}

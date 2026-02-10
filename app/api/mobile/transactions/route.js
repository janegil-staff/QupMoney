import { NextResponse } from 'next/server';
import Transaction from '@/models/Transaction'; // Adjust path
import { requireAuth } from '@/lib/auth-utils'; // Adjust path to auth-utils.js
import { connectDB } from '@/lib/db';

// GET /api/mobile/transactions
export async function GET(request) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = { user: auth.user._id };

    // Filter by date range if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST /api/mobile/transactions
export async function POST(request) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const { description, amount, type, category, date } = await request.json();

    // Validation
    if (!amount || !type || !category) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    if (type !== 'income' && type !== 'expense') {
      return NextResponse.json(
        { message: 'Type must be income or expense' },
        { status: 400 }
      );
    }

    const transaction = await Transaction.create({
      user: auth.user._id,
      description,
      amount,
      type,
      category,
      date: date || Date.now(),
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

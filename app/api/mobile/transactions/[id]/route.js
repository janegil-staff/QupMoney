import { NextResponse } from 'next/server';
import Transaction from '@/models/Transaction'; // Adjust path
import { requireAuth } from '@/lib/auth-utils'; // Adjust path
import { connectDB } from '@/lib/db';

// GET /api/mobile/transactions/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== auth.user._id.toString()) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// PUT /api/mobile/transactions/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== auth.user._id.toString()) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('Update transaction error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/mobile/transactions/[id]
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // Check authentication
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json(auth.response, { status: auth.status });
    }

    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== auth.user._id.toString()) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 401 }
      );
    }

    await transaction.deleteOne();

    return NextResponse.json({
      message: 'Transaction deleted',
      id: params.id,
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

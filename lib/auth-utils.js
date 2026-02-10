import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Adjust path to your User model

// Get user from JWT token in Authorization header
export async function getUserFromToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    return user;
  } catch (error) {
    console.error('Get user from token error:', error);
    return null;
  }
}

// Middleware-like function to check authentication
export async function requireAuth(request) {
  const user = await getUserFromToken(request);
  
  if (!user) {
    return {
      error: true,
      response: {
        message: 'Not authorized, no valid token',
      },
      status: 401,
    };
  }

  return {
    error: false,
    user,
  };
}

import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required.' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) { 
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired.' });
      }
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
};

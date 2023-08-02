import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const secret = 'LET8bREF7OTe3mks#hpF7VOVgw3WZ2^9nEX@8IIdqZY6OyVoa!';

function generateToken(userData: any) {
  const token = jwt.sign(userData, secret);
  return token;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] || ' ';

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const tokenDecod = jwt.decode(token);
    req.body.userData = tokenDecod;

    return next();
  } catch (error) {
    console.log(error);
  }
}

export default {
  generateToken,
  verifyToken,
};

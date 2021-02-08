import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IParams {
  req: Request;
  _: Response;
  next: NextFunction;
  arg: string;
}
interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication({
  arg,
  next,
  req,
  _,
}: IParams): void {
  console.log(arg);
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError('O usuário não está autenticado.', 401);
  }

  const [, token] = authToken.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    req.user.id = sub;

    return next();
  } catch (err) {
    throw new AppError('Token inválido', 401);
  }
}

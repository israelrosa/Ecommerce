import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export function adminOnly(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const isAdmin = req.user.admin;

  if (isAdmin) {
    next();
  }
  throw new AppError('O usuário não é um ADM.');
}

export function userOnly(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const isAdmin = req.user.admin;

  if (!isAdmin) {
    next();
  }
  throw new AppError('O ADM não tem permissão.');
}

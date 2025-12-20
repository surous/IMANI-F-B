
import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export function successResponse(data: any, message = 'Success') {
  return { success: true, data, message };
}

export function errorResponse(message: string, status = 400) {
  return { success: false, error: message };
}
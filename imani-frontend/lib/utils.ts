import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function successResponse(data: any, message = "Success") {
  return { success: true, data, message }
}

export function errorResponse(message: string, status = 400) {
  return { success: false, error: message }
}
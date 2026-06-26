import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAge(birthDate: string, from = new Date()): number {
  const birth = new Date(birthDate);
  let age = from.getFullYear() - birth.getFullYear();
  const hadBirthday =
    from.getMonth() > birth.getMonth() ||
    (from.getMonth() === birth.getMonth() && from.getDate() >= birth.getDate());

  if (!hadBirthday) age -= 1;

  return age;
}

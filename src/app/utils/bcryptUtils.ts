// import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
  console.log('password', password);
  return password;
}

export function comparePassword(password: string, hash: string): boolean {
  console.log('password', password);
  return password === hash;
}
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const checkUserExists = async (contact: string) => {
  const user = await prisma.user.findUnique({ where: { contact } });
  return user ? user.id : null;
};

export const createUser = async (name: string, email: string, contact: string) => {
  return await prisma.user.create({
    data: { name, email, contact, verified: false },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

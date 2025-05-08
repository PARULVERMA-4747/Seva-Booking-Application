import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSevas = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
  
    const sevas = await prisma.seva.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    const total = await prisma.seva.count();
  
    return {
      sevas,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  };

  export const getSevaByCode = async (code: string) => {
    const seva = await prisma.seva.findUnique({
      where: { code },
    });
  
    if (!seva) throw new Error('Seva not found');
    return seva;
  };
  

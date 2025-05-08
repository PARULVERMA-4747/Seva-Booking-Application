import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async (items: any[], addressInput: any, userId: number) => {
  const amountToPay = items.reduce((sum, seva) => sum + seva.discountedPrice, 0);
  const paymentId = Math.floor(100000 + Math.random() * 900000);

  const address = await prisma.address.create({
    data: {
      ...addressInput,
      userId,
    },
  });

  const order = await prisma.order.create({
    data: {
      items,
      amountToPay,
      paymentId,
      addressId: address.id,
    },
  });

  return {
    orderId: order.id,
    paymentId: order.paymentId,
    amountToPay: order.amountToPay,
  };
};

export const getOrderById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { address: true },
  });
};

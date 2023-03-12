import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
export const emailRouter = createTRPCRouter({
  storeEmail: publicProcedure
    .input(z.string().email())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.email.create({
        data: {
          address: input,
        },
      });
    }),

  deleteEmail: publicProcedure
    .input(z.string().email())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.email.delete({
        where: {
          address: input,
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can now see this secret message!";
  }),
});

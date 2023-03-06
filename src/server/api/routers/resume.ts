import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const resumeRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    console.log("@@@@@@@@@@@@@@@@@@ GET USER IS RUNNING");
    return ctx.prisma.user.findFirst();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can now see this secret message!";
  }),
});

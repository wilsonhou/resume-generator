import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      // get user from prisma
      const user = ctx.prisma.user.findFirst();
      console.log(user);

      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // generateDotPoint: protectedProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return (async () => {
  //       const response = {
  //         data: {
  //           choices: [{ text: input.text }],
  //         },
  //       };
  //       console.log("running query!");

  //       // ~1c each time this is called so far.
  //       // const response = await openai.createCompletion({
  //       //   model: "text-davinci-003",
  //       //   prompt: input.text,
  //       //   temperature: 0.7,
  //       //   max_tokens: 256,
  //       //   top_p: 1,
  //       //   frequency_penalty: 0,
  //       //   presence_penalty: 0,
  //       // });

  //       return response.data;
  //     })();
  //   }),

  // getUser: protectedProcedure.query(({ ctx }) => {
  //   // const test = ctx.session;
  //   // console.log("##### this is a test: ", ctx);
  //   return ctx.prisma.user.findFirst();
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can now see this secret message!";
  }),
});

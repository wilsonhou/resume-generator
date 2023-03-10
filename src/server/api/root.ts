import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { resumeRouter } from "./routers/resume";
import { emailRouter } from "./routers/email";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  resume: resumeRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

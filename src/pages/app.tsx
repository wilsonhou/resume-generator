import {
  GetServerSideProps,
  GetServerSidePropsContext,
  type NextPage,
} from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";
import { AppHeader } from "components/AppHeader";
import { api } from "../utils/api";
import { getServerAuthSession } from "server/auth";
import { z } from "zod";

// @TODO - cost-saving techniques are CRUCIAL.
// Quillbot?
// @TODO - fix multifetching bug with trpc (we only want it to fetch on button click!)

const App: NextPage = () => {
  const { data: sessionData } = useSession();

  const isLoggedIn = sessionData?.user?.email;

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    {}
  );

  const { data } = api.resume.getUser.useQuery(undefined, {});

  return (
    <>
      <Head>
        <title>Yesume</title>
        <meta name="description" content="Resume AI Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader></AppHeader>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Resume <span className="text-[hsl(280,100%,70%)]">AI</span>{" "}
            Buildertest
          </h1>
          {isLoggedIn && (
            <>
              <p className="text-center text-2xl text-white">
                {secretMessage && <span> {secretMessage}</span>}
              </p>
              <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Click me!
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default App;

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   const session = await getServerAuthSession(ctx);

//   if (!session) {
//     return {
//       props: {},
//       redirect: "/login",
//     };
//   }

//   return {
//     props: {},
//   };
// };

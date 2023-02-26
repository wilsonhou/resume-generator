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

// @TODO - cost-saving techniques are CRUCIAL.
// Quillbot?
// @TODO - fix multifetching bug with trpc (we only want it to fetch on button click!)

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Resume AI Builder</title>
        <meta name="description" content="Resume AI Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader></AppHeader>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Resume <span className="text-[hsl(280,100%,70%)]">AI</span> Builder
          </h1>
          {
            // @TODO - make login page
            isLoggedIn ? (
              <>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2rem]">
                  Enter job info to generate a bullet point
                </h2>
                <textarea
                  value={text}
                  onChange={handleChange}
                  className="h-48 w-full rounded-md pl-2 pt-2 text-xl leading-normal sm:w-[600px]"
                  maxLength={1000}
                />

                <button
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    handleClick(e).catch(() => null);
                  }}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                >
                  Generate
                </button>
                <p className="text-2xl text-white">Dot points: </p>
                <p className="text-2xl text-white">{data?.choices[0]?.text}</p>
                <button
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => void signOut()}
                >
                  Log out
                </button>
                <p className="text-center text-2xl text-white">
                  {sessionData && (
                    <span>Logged in as {sessionData.user?.name}</span>
                  )}
                  {secretMessage && <span> - {secretMessage}</span>}
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-center justify-center gap-4">
                  <button
                    className="flex gap-2 rounded-full bg-[#069] px-10 py-3 font-semibold text-white no-underline hover:bg-[#004182]"
                    onClick={() => void signIn("linkedin")}
                  >
                    <Image
                      src="https://authjs.dev/img/providers/linkedin-dark.svg"
                      width="24"
                      height="24"
                      alt="linkedin logo"
                    />
                    Sign in with LinkedIn
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </main>
    </>
  );
};

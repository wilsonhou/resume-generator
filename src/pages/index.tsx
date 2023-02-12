import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { ChangeEvent, MouseEvent, useState } from "react";

// @TODO - cost-saving techniques are CRUCIAL.
// Quillbot?

type Info = string;

const generatePrompt = (info: Info[]) => `
You are a resume writer.

To write a successful resume, each dot point should answer one of the following questions:
- What did you work on? Assume that recruiters and hiring managers don’t know much about your last company or role. So provide a brief description about the product line or initiative, so they can find you the right role or team.
- How did you get your work done? With each position, be sure to include technologies you used. Provide team size and departments you worked with.
- What impact did you have? Share your impact on the business — growth numbers, cost savings, sales increase, marketing distribution. This shows you’ve been given responsibility — and delivered — to benefit the business.

Given the information in the following dot points, write 4 examples of a single bullet point, highlighting their technical skills, projects, and achievements.

${info.map((i) => `- ${i}`).join("\n")}

Response:
`;

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const prompt = generatePrompt(text.split(".").map((i) => i.trim()));

  const { data, refetch } = api.example.generateDotPoint.useQuery(
    { text: prompt },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  // make the textarea a controlled component
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await refetch();
  };

  console.log("DATA IS: ", data);
  console.log("DATA IS: ", data?.choices[0]?.text);

  return (
    <>
      <Head>
        <title>Resume AI Builder</title>
        <meta name="description" content="Resume AI Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Resume <span className="text-[hsl(280,100%,70%)]">AI</span> Builder
          </h1>
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

          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

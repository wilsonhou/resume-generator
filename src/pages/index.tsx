import { type NextPage } from "next";
import Head from "next/head";

import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Yesume</title>
        <meta name="description" content="Resume AI Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed flex w-full items-center justify-center px-4 pt-8">
        <nav className="top-0 z-10 flex h-16 w-full max-w-2xl items-center justify-between rounded-xl bg-white py-3 px-6 shadow-md">
          <Link href="/">
            {/* <h1 className="font-black">Yesume</h1> */}
            <h1>Yesume</h1>
          </Link>
          <Link href="/">Features</Link>
          <button className="rounded-lg bg-[#D2DFC4] px-4 py-2 hover:bg-[#D2DFC4CC] active:bg-[#D2DFC4EE]">
            Join waitlist
          </button>
        </nav>
      </header>
      <main className="h-[100vh] w-full">
        <div className="flex h-full w-full items-center justify-center bg-red-400 px-6 text-center text-4xl">
          <h2>
            Land your <span className="font-black">dream</span> dev job
          </h2>
        </div>
      </main>
    </>
  );
};

export default Home;

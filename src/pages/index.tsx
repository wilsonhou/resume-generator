import { type NextPage } from "next";
import Head from "next/head";

import Link from "next/link";
import { useState } from "react";
import { api } from "utils/api";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [showWaitlist, setShowWaitlist] = useState(true);

  const storeEmail = api.email.storeEmail.useMutation({});

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
            <h1 className="text-md">Yesume</h1>
          </Link>
          <button
            onClick={() => setShowWaitlist((val) => !val)}
            className="btn-primary btn"
          >
            Do cool thing
          </button>
        </nav>
      </header>
      <main className="h-[100vh] w-full">
        <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <h2 className="text-4xl md:text-6xl">Land your dream dev job</h2>
          <h6 className="mt-2 text-[#D4D4D4] md:text-lg">
            Apply to Accepted, quicker.
          </h6>
          <div className="relative mt-6 flex w-full items-center justify-center">
            <div
              className={`form-control relative transition-all ${
                showWaitlist ? "top-0 opacity-100" : "top-5 opacity-0"
              }`}
            >
              <div className="input-group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Join the wait list..."
                  className="input-bordered input"
                />
                <button
                  onClick={() => {
                    setInputValue("");
                    storeEmail.mutate(inputValue);
                  }}
                  className="btn-primary btn-square btn"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={`bg-[rgba(0, 0, 0, 0.02)] absolute flex h-16 w-[346px] items-center rounded-md p-0 shadow-lg transition-all sm:h-auto sm:w-[492px] ${
                showWaitlist
                  ? "top-5 z-[-1] opacity-0"
                  : "top-0 z-10 opacity-100"
              }`}
            >
              <div className="flex w-[calc(100%)] items-center gap-5 sm:py-6 sm:pl-4">
                <svg
                  className="mx-2 h-8 w-8 md:mx-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="52 42 88 66"
                >
                  <path
                    fill="#4285f4"
                    d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
                  />
                  <path
                    fill="#34a853"
                    d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
                  />
                  <path
                    fill="#fbbc04"
                    d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
                  />
                  <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
                  <path
                    fill="#c5221f"
                    d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
                  />
                </svg>
                <div className="w-[calc(100%)] max-w-[307px] justify-start overflow-hidden text-ellipsis whitespace-nowrap text-left text-xs sm:text-base">
                  <p className="w-[calc(100%)] overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                    That recruiter you&#39;ve been waiting for
                  </p>
                  <p className="w-[calc(100%)] overflow-hidden text-ellipsis whitespace-nowrap font-light">
                    Re: Congratulations you&#39;ve got the job!...
                  </p>
                </div>
              </div>
              <div className="flex h-full border-l-[0.5px] border-[rgba(0,0,0,0.1)] text-xs font-light sm:text-base">
                <button
                  onClick={() => setShowWaitlist(true)}
                  className="flex h-full w-full items-center justify-center pl-3 pr-2 hover:opacity-60 active:opacity-90 sm:py-[34px] sm:pl-6 sm:pr-4"
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

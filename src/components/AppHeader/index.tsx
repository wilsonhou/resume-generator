import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const AppHeader = () => {
  const { data: sessionData } = useSession();

  console.log(sessionData);
  console.log(sessionData?.user?.name);
  return (
    <header className="m-0 flex items-center justify-between border-b border-gray-200  bg-[#2e026d] px-4 py-3">
      <div className="text-white">Logo</div>
      <div className="flex items-center gap-6 text-white">
        {sessionData?.user?.name != null ? (
          <>
            <div>Logged in as {sessionData?.user?.name}</div>
            <button
              className="flex gap-2 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline hover:bg-white/20"
              onClick={() => void signOut()}
            >
              Log out
            </button>
          </>
        ) : (
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
        )}
      </div>
    </header>
  );
};

import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  useState,
  useEffect,
  type SetStateAction,
  type FormEvent,
} from "react";
// import { api } from "~/utils/api";
import { VariableIcon } from "@heroicons/react/solid";
import { env } from "../env.mjs";
import Navbar from "./components/navbar";
import TestPortal from "./portal/portal";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="min-h-[100vh] overflow-hidden bg-white font-general duration-150 dark:bg-gray-900">
      <Navbar />
      {!session?.user ? (
        <div className="relative z-10 flex  h-[calc(100vh-3.7rem)] w-full flex-col items-center justify-center text-3xl font-extrabold ">
          <Image
            alt="Background"
            src="/images/portal-light.png"
            className="z-5 absolute h-full w-full opacity-20 blur-[3px] dark:hidden"
            priority
            height={980}
            width={980}
          />
          <Image
            alt="Background"
            src="/images/portal-dark.png"
            className="z-5 absolute hidden h-full w-full opacity-20 blur-[3px] dark:inline"
            priority
            height={980}
            width={980}
          />
          <div className="z-2 pattern-dots absolute h-[100vh] w-[100vw] duration-150 pattern-bg-gray-300 pattern-gray-500 pattern-opacity-20 pattern-size-8 dark:pattern-gray-500 dark:pattern-bg-gray-900"></div>
          <h5 className="z-10 text-7xl font-extrabold">
            Welcome to{" "}
            <span className="rounded-3xl bg-red-600 px-3 py-1 text-white dark:bg-red-700">
              OMMC Year 3
            </span>
          </h5>
          <button
            onClick={() => void signIn()}
            className="z-10 mt-4 select-none rounded-2xl p-4 duration-150 hover:scale-105 hover:underline"
          >
            Sign in to submit
          </button>
        </div>
      ) : (
        <TestPortal />
      )}
    </main>
  );
};

export default Home;

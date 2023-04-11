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
import {
  VariableIcon,
  ServerIcon,
  TerminalIcon,
  ChatIcon,
  TrashIcon,
  MicrophoneIcon,
  PaperClipIcon,
  CogIcon,
  PhoneIcon,
  MailIcon,
  BookmarkAltIcon,
} from "@heroicons/react/solid";
import { env } from "../env.mjs";
import Navbar from "./components/navbar";
import TestPortal from "./components/testPortal";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="min-h-[100vh] overflow-hidden bg-white font-general duration-150 dark:bg-gray-900">
      <Navbar />
      {!session?.user ? (
        <div className="relative z-10 flex  h-[calc(100vh-3.7rem)] w-full flex-col items-center justify-center text-3xl font-extrabold ">
          <div className="z-5 absolute h-full w-full bg-[url('https://images.g2crowd.com/uploads/attachment/file/1224339/App-screen-3-G2.png')] bg-cover opacity-20 blur-[3px]"></div>
          <div className="z-2 pattern-cross absolute h-[100vh] w-[100vw] duration-150 pattern-bg-gray-300 pattern-gray-500 pattern-opacity-20 pattern-size-8 dark:pattern-gray-500 dark:pattern-bg-gray-900"></div>

          <button
            onClick={() => void signIn()}
            className="z-10 select-none rounded-2xl p-4 duration-150 hover:scale-105 hover:underline"
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

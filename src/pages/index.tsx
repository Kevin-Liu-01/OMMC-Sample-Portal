import { type NextPage } from "next";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
// import { api } from "~/utils/api";
import Navbar from "./components/navbar";
import TestPortal from "../portal/portal";
import { CursorClickIcon } from "@heroicons/react/solid";
import Head from "next/head";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>OMMC Portal</title>
      </Head>
      <main className="min-h-[100vh] overflow-hidden bg-white font-general duration-150 dark:bg-gray-900">
        <Navbar />
        {!session?.user ? (
          <div className="relative z-10 flex  h-[calc(100vh-3.58rem)] w-full flex-col items-center justify-center text-3xl font-extrabold ">
            {" "}
            <div className="z-5 pattern-opacity-70 pattern-cross absolute h-[100vh] w-[100vw] duration-150 pattern-bg-gray-100 pattern-gray-300 pattern-size-8 dark:pattern-gray-800 dark:pattern-bg-gray-900"></div>
            <Image
              alt="Background"
              src="/images/portal-light.png"
              className="z-5 absolute h-full w-full object-cover opacity-20 blur-[3px] dark:hidden"
              priority
              height={980}
              width={980}
            />
            <Image
              alt="Background"
              src="/images/portal-dark.png"
              className="z-5 absolute hidden h-full w-full object-cover opacity-20 blur-[3px] dark:inline"
              priority
              height={980}
              width={980}
            />
            <h5 className="z-10 text-center text-3xl  font-extrabold sm:text-4xl md:text-5xl lg:mb-8 lg:text-6xl xl:text-7xl">
              Welcome to{" "}
              <span className="block rounded-3xl bg-red-600 px-3 py-1 text-white dark:bg-red-700 sm:inline">
                OMMC Year 3
              </span>
            </h5>
            <button
              onClick={() => void signIn()}
              className="z-10 mt-8 flex select-none flex-row items-center rounded-2xl p-4 text-xl font-[600] duration-150 hover:scale-[1.02] hover:underline lg:text-3xl"
            >
              <CursorClickIcon className="mr-2 h-7 w-7" /> Register to Submit
            </button>
          </div>
        ) : (
          <TestPortal />
        )}
      </main>
    </>
  );
};

export default Home;

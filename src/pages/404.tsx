"use client"; // Error components must be Client components
import { ArrowSmRightIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/navbar";
import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>Error 404</title>
      </Head>
      <div className="relative h-screen overflow-hidden bg-gradient-to-tr from-red-700 via-red-600 to-red-600 font-general dark:from-red-900 dark:via-red-700 dark:to-red-500">
        <Navbar />
        <div className="z-5 pattern-opacity-90 pattern-dots absolute h-[100vh] w-[100vw] duration-150 pattern-bg-gray-500 pattern-gray-700 pattern-size-6 dark:pattern-bg-gray-700 dark:pattern-gray-900"></div>
        <header className="mx-auto flex h-[calc(100%-3.5rem)] max-w-7xl items-center justify-center py-6 px-4 sm:px-6 md:text-left lg:px-8">
          <div className="relative z-10 grid md:grid-cols-2 md:gap-8">
            <section className="my-auto ">
              <div className="pb-6 text-3xl font-bold text-white lg:text-4xl ">
                <EyeOffIcon className="mx-auto my-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-tr  from-red-500 via-red-600 to-red-600 p-2 text-white drop-shadow-lg dark:from-red-500 dark:to-red-600 md:mx-0"></EyeOffIcon>
                {"This page doesn't exist!"}
              </div>
              <div className="pb-4 text-lg font-semibold text-gray-100 md:max-w-xl  lg:pb-8 lg:text-2xl">
                Sorry about that! Please return to the portal.
              </div>
              <Link href="/" className=" md:mr-4 ">
                <button className="mx-auto flex transform select-none rounded-xl border border-transparent bg-red-600 py-3 px-4  text-base font-semibold text-white drop-shadow-lg duration-150 ease-in-out hover:scale-105 hover:bg-red-700 hover:text-gray-100 dark:bg-red-600 dark:text-gray-100 dark:hover:bg-red-700 dark:hover:text-red-400 md:mx-0 md:text-lg dark:lg:bg-red-600">
                  Back to home{" "}
                  <ArrowSmRightIcon className="my-auto ml-2 h-5 w-5"></ArrowSmRightIcon>
                </button>
              </Link>
            </section>
            <section className="relative mt-12 md:mt-0">
              <Image
                src="/images/error.webp"
                className="relative z-10 mx-auto w-72 select-none object-contain md:w-96"
                alt="404"
                height={400}
                width={400}
              />
              <div className="animate-blob1 absolute inset-0 left-0 right-0 top-0 bottom-0 transform-gpu rounded-full bg-red-400 opacity-[15%] blur-2xl dark:bg-red-500 "></div>
            </section>
          </div>
        </header>
      </div>
    </>
  );
}

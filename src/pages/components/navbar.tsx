import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  DotsHorizontalIcon,
  PlusIcon,
  ViewGridIcon,
  LoginIcon,
  LogoutIcon,
  UserCircleIcon,
  MenuIcon,
} from "@heroicons/react/solid";

const Navbar = () => {
  const { data: session } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          className="flex h-full w-full items-center justify-center text-gray-300 hover:text-purple-500"
          role="button"
          onClick={() => setTheme("light")}
        >
          {/* <div className="rings-halo absolute z-50 h-full w-full bg-contain bg-center bg-no-repeat opacity-70"></div> */}
          <MoonIcon className="h-8 w-8" />
        </button>
      );
    } else {
      return (
        <button
          className="flex h-full w-full items-center justify-center  text-black hover:text-orange-400"
          role="button"
          onClick={() => setTheme("dark")}
        >
          {/* <div className="rings-halo absolute z-50 h-full w-full bg-contain bg-center bg-no-repeat opacity-70"></div> */}
          <SunIcon className="h-8 w-8" />
        </button>
      );
    }
  };

  return (
    <nav className="relative z-20 border-b-[1.5px] border-gray-600 bg-gray-100 font-general text-gray-900 shadow-lg duration-75 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-row justify-center">
        <div className="flex flex-row items-center">
          <Image
            src="/images/triangle.png"
            alt="logo"
            className="mx-4 inline h-12 w-12"
            height={400}
            width={400}
          />
          <h1 className="relative hidden select-none text-2xl font-extrabold tracking-tight duration-75 dark:text-white sm:inline lg:text-4xl 2xl:text-[3rem]">
            <span className="duration-150 dark:text-red-600 ">
              OMMC Submission Portal
            </span>
          </h1>
        </div>
        <div className="ml-auto flex ">
          <div className="hidden h-full items-center py-2 px-2 duration-75 dark:text-white lg:flex">
            <span className="select-none text-xl">
              {session?.user?.name || "Sign in to submit"}
            </span>
            <div className="relative my-auto ml-2 inline h-10 w-10 rounded-full border-[1.5px] border-gray-900 duration-75 dark:border-white">
              {session?.user.image ? (
                <Image
                  src={session?.user.image}
                  alt="Profile Picture"
                  className="relative h-full w-full rounded-full"
                  height={500}
                  width={500}
                />
              ) : (
                <UserCircleIcon className="relative h-full w-full rounded-full duration-75 dark:text-white" />
              )}
              <div className="absolute right-0 bottom-0 h-2 w-2 rounded-full border-[1.5px] border-gray-900 bg-green-500 duration-75 dark:border-white"></div>
            </div>
          </div>

          <button
            className=" h-full border-l border-gray-600 px-2 font-semibold no-underline duration-75 hover:bg-gray-300 dark:hover:bg-white/10"
            onClick={session ? () => void signOut() : () => void signIn()}
          >
            {session ? (
              <LogoutIcon className="h-8 w-8" />
            ) : (
              <LoginIcon className="h-8 w-8" />
            )}
          </button>

          <div className="relative flex h-full items-center justify-center border-l-[1.5px] border-gray-600 px-2 duration-75 hover:bg-gray-300 dark:hover:bg-white/10">
            {renderThemeChanger()}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

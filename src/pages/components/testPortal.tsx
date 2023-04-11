import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  useState,
  useEffect,
  type SetStateAction,
  type FormEvent,
  ChangeEvent,
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
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";
import { env } from "../../env.mjs";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const Portal: NextPage = () => {
  const { data: session } = useSession();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [buttonEffect, setButtonEffect] = useState(false);
  const [buttonEffect2, setButtonEffect2] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  const setPageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) <= numPages && parseInt(e.target.value) > 0) {
      setPageNumber(parseInt(e.target.value));
    }
  };
  const handleButtonClick = (
    effect: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
    pageEffect: { (): void; (): void }
  ) => {
    effect(true);
    pageEffect();
  };
  return (
    <main className="z-6 bg-pattern bg-dotted relative h-full bg-white font-general duration-150 dark:bg-gray-900">
      <div className="z-5 pattern-cross absolute h-[100vh] w-[100vw] duration-150 pattern-bg-gray-300 pattern-gray-500 pattern-opacity-20 pattern-size-8 dark:pattern-gray-500 dark:pattern-bg-gray-900"></div>
      <div className="grid h-full w-full grid-cols-12">
        <div className="z-10 col-span-5 flex h-[calc(100vh-3.7rem)] justify-center overflow-x-hidden overflow-y-scroll">
          <nav className="absolute bottom-4 z-20 mx-auto flex flex-row items-center gap-2 rounded-2xl bg-gray-300 bg-opacity-90 p-2 duration-150 dark:bg-gray-700 dark:hover:bg-opacity-70">
            <button
              className={`${
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                buttonEffect && "animate-wiggle"
              } flex items-center rounded-lg bg-gray-100 px-2 py-1 duration-75 hover:scale-105 dark:bg-gray-800`}
              onClick={() => {
                handleButtonClick(setButtonEffect, goToPrevPage);
              }}
              onAnimationEnd={() => setButtonEffect(false)}
            >
              <ArrowLeftIcon className="inline h-4 w-4" /> Prev
            </button>
            <button
              className={`${
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                buttonEffect2 && "animate-wiggle"
              } flex items-center rounded-lg bg-gray-100 px-2 py-1 duration-75 hover:scale-105 dark:bg-gray-800`}
              onClick={() => {
                handleButtonClick(setButtonEffect2, goToNextPage);
              }}
              onAnimationEnd={() => setButtonEffect2(false)}
            >
              Next
              <ArrowRightIcon className="inline h-4 w-4" />
            </button>
            <p className="mx-2 text-sm">
              Page{"  "}
              <input
                name="page"
                value={pageNumber}
                onChange={(e) => setPageHandler(e)}
                className="mx-0.5 inline w-[2rem] rounded-lg border border-gray-300 bg-gray-50 px-1 py-0.5 text-center text-gray-900
                duration-150 focus:outline-none focus:ring-red-600 focus-visible:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
              {"  "}
              of {numPages}
            </p>
          </nav>
          <div className="relative flex flex-col justify-center">
            <Document
              file="/OMMC_2023_Shortlist.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              className="react-pdf__Page__canvas"
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </div>
        <div className="col-span-7">s</div>
      </div>
    </main>
  );
};

export default Portal;

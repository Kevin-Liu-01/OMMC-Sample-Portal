import { useState, type SetStateAction, type ChangeEvent } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/solid";
// import { env } from "../../env.mjs";
import { Document, Page, pdfjs } from "react-pdf";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PDFViewer = () => {
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
    <section
      id=""
      className="scrollbar z-10 col-span-7 flex justify-center overflow-x-hidden overflow-y-scroll border-gray-600 shadow-inner md:col-span-5 md:h-[calc(100vh-3.58rem)] md:border-r-[1.5px]"
    >
      <nav className="absolute top-6 z-20 mx-auto flex select-none flex-row items-center gap-2 rounded-2xl border border-gray-400 bg-gray-300 bg-opacity-90 p-2 shadow-lg duration-150 dark:border-gray-800 dark:bg-gray-700 dark:hover:bg-opacity-70 md:top-auto md:bottom-4">
        <button
          className={`${
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            buttonEffect && "animate-wiggle"
          } flex items-center rounded-lg bg-gray-100 px-2 py-1 text-sm duration-150 hover:scale-105 dark:bg-gray-800 lg:text-base`}
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
          } flex items-center rounded-lg bg-gray-100 px-2 py-1 text-sm duration-150 hover:scale-105 dark:bg-gray-800 lg:text-base`}
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
        </p>{" "}
        <Link
          href="/OMMC_2023_Shortlist.pdf"
          className="flex flex-row items-center rounded-lg bg-gray-100 px-2 py-1 duration-150 hover:scale-105 dark:bg-gray-800"
        >
          <DocumentDownloadIcon className="inline h-4 w-4 lg:mr-2" />
          <span className="hidden lg:inline">Download</span>
        </Link>
      </nav>

      <div className="relative mt-[4.5rem] flex select-none flex-col justify-center md:mt-0">
        <Document
          file="/OMMC_2023_Shortlist.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="react-pdf__Page__canvas p-4 md:p-6 "
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </section>
  );
};

export default PDFViewer;

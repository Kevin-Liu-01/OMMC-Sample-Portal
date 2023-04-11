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
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { env } from "../../env.mjs";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import PDFViewer from "./pdfViewer";
import Test from "./test";

const Portal: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main className="z-6 relative h-full bg-white font-general duration-150 dark:bg-gray-900">
      <div className="z-5 pattern-opacity-90 pattern-dots absolute h-[100vh] w-[100vw] duration-150 pattern-bg-gray-500 pattern-gray-700 pattern-size-6 dark:pattern-bg-gray-500 dark:pattern-gray-700"></div>
      <div className="grid h-full w-full grid-cols-12">
        <PDFViewer />
        <Test />
      </div>
    </main>
  );
};

export default Portal;

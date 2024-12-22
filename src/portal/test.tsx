import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  UserAddIcon,
  UserRemoveIcon,
  ViewGridIcon,
  ArrowLeftIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  AtSymbolIcon,
  InformationCircleIcon,
  UploadIcon,
  CheckIcon,
  XIcon,
  SpeakerphoneIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Confetti from "react-confetti";

import useLocalStorage from "../utils/useLocalStorage";
import Question from "./question";
import Modal from "./modal";

// import { env } from "../../env.mjs";

// Define types for member data
interface TeamMember {
  name: string;
  age: string;
  grade: string;
  school: string;
}

// Define types for submission data (use the correct structure from your API)
interface Submission {
  email: string;
  teamName: string;
  teamMembers: string;
  q1: string;
  q2: string;
  q3: string;
  started: string;
}

const Test = () => {
  const { data: session } = useSession();
  const [started, setStarted] = useLocalStorage("STARTED", false);
  const [teamName, setTeamName] = useLocalStorage("TEAM_NAME", "");
  const [teamMembers, setTeamMembers] = useLocalStorage<TeamMember[]>(
    "TEAM_MEMBER",
    []
  );
  const [newMember, setNewMember] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [layout, setLayout] = useState<boolean>(false);

  const [q1, setQ1] = useLocalStorage("Q1", "");
  const [q2, setQ2] = useLocalStorage("Q2", "");
  const [q3, setQ3] = useLocalStorage("Q3", "");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confetti, showConfetti] = useState<boolean>(false);
  const [current, setCurrent] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch("/api/submissions");
      const data: Submission[] = await res.json();
      setCurrent(data);
    };
    void fetchSubmissions();
  }, []);

  useEffect(() => {
    if (current.length > 0) {
      current.forEach((submission) => {
        if (submission.email === session?.user?.email) {
          setTeamMembers(JSON.parse(submission.teamMembers));
          setStarted(submission.started === "true");
          setTeamName(submission.teamName.replace('"', "").replace('"', ""));
          setQ1(submission.q1.replace('"', "").replace('"', ""));
          setQ2(submission.q2.replace('"', "").replace('"', ""));
          setQ3(submission.q3.replace('"', "").replace('"', ""));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const questions = [
    {
      id: 1,
      state: q1,
      setState: setQ1,
    },
    {
      id: 2,
      state: q2,
      setState: setQ2,
    },
    {
      id: 3,
      state: q3,
      setState: setQ3,
    },
  ];

  const addMember = () => {
    if (
      newMember.trim() !== "" &&
      age.trim() !== "" &&
      grade.trim() !== "" &&
      school.trim() !== ""
    ) {
      setTeamMembers([
        ...teamMembers,
        { name: newMember.trim(), age, grade, school },
      ]);
      setNewMember("");
      setAge("");
      setGrade("");
      setSchool("");
    }
  };

  const removeMember = (index: number) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setTeamMembers(updatedTeamMembers);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStarted(true);
  };

  const gridHandler = () => {
    let returnedString = "grid ";
    if (layout) {
      returnedString += "grid-cols-2 gap-x-4";
    } else {
      returnedString += "grid-cols-1 ";
    }
    return returnedString;
  };

  const buttonSelector = () => {
    if (confetti) {
      return (
        <button className="mr-1 mb-1 flex flex-row items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:bg-red-700 hover:shadow-lg focus:outline-none active:bg-emerald-600">
          <CheckIcon className="mr-2 h-5 w-5" /> Submitted!
        </button>
      );
    } else if (q1 && q2 && q3) {
      return (
        <button
          onClick={() => setShowModal(true)}
          className="mr-1 mb-1 flex flex-row items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:bg-red-700 hover:shadow-lg focus:outline-none active:bg-red-600"
        >
          <UploadIcon className="mr-2 h-5 w-5" /> Submit
        </button>
      );
    } else {
      return (
        <button className="mr-1 mb-1 flex flex-row items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold uppercase text-white opacity-70 shadow-md outline-none transition-all">
          <XIcon className="mr-2 h-5 w-5" /> Complete all questions
        </button>
      );
    }
  };

  return (
    <section className="scrollbar z-10 col-span-7 h-[calc(100vh-3.58rem)] overflow-y-scroll bg-gray-200 p-4 dark:bg-gray-900/95 md:p-8">
      <Confetti
        numberOfPieces={confetti ? 150 : 0}
        // width={}
        // height={}
      />
      {started ? (
        <div className="relative flex flex-col">
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            teamName={teamName}
            showConfetti={showConfetti}
          />

          <div className="mb-6 flex items-center rounded-xl bg-gray-50 p-4 shadow-md dark:bg-gray-800 md:p-6 md:py-5">
            <span className="flex flex-row items-center text-xs md:text-lg">
              <UserCircleIcon className="mr-2 h-12 w-12" /> Signed in as{" "}
              {session ? session?.user?.name : "Guest"}
            </span>
            <button
              onClick={() => setLayout(!layout)}
              className="ml-auto mr-2 flex items-center rounded-lg bg-red-600 px-2 py-1 font-semibold text-white duration-150 hover:bg-red-700"
            >
              <ViewGridIcon className="mr-1 h-5 w-5" /> Switch Layout
            </button>
            <button
              onClick={() => setStarted(!started)}
              className="flex items-center rounded-lg bg-red-600 px-2 py-1 font-bold text-white duration-150 hover:bg-red-700"
            >
              <ArrowLeftIcon className="mr-1 h-5 w-5" /> BACK
            </button>
          </div>
          <div className={gridHandler()}>
            {questions.map((question) => (
              <Question
                key={question.id}
                id={question.id}
                state={question.state}
                setState={question.setState}
              />
            ))}
          </div>
          {buttonSelector()}
        </div>
      ) : (
        <div className="flex h-full flex-col ">
          <h1 className="mb-6 text-xl font-bold md:text-2xl lg:mb-8 lg:text-3xl xl:text-4xl 2xl:text-[2.8rem]">
            Welcome to the{" "}
            <span className="rounded-xl bg-red-600 px-2 py-0.5 text-white xl:rounded-2xl xl:px-3">
              OMMC Sample
            </span>{" "}
            Test!
          </h1>
          <h2 className="mb-6 flex max-w-4xl items-center rounded-lg border border-dashed border-red-400 bg-red-200/50 p-2 font-bold uppercase italic text-red-600 dark:bg-red-400/20 ">
            <SpeakerphoneIcon className="mr-2 h-6 w-6" />
            DISCLAIMER: This is not the OMMC Year 4 Test. This is a mock test
            with sample problems.
          </h2>
          <div className="mb-6 max-w-4xl rounded-xl text-xs lg:text-sm xl:text-base ">
            <div className="mb-4 rounded-lg border border-gray-400 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-700">
              <h2 className="mb-1 flex flex-row items-center text-xl font-bold">
                <InformationCircleIcon className="mr-2 h-6 w-6" /> A Few Things
                to Keep in Mind:
              </h2>
              <ul className="list-inside list-disc pl-2">
                <li>
                  Please ensure that you have a stable internet connection.
                </li>
                <li>
                  The test is not timed, so do not worry about having enough
                  time to complete it.
                </li>
                <li>
                  Discussion on forums such as AoPS or the discord server is
                  strictly prohibited.
                </li>
                <li>
                  You may only collaborate with other members of your team. The
                  maximum team size is 4.
                </li>
                <li>
                  If you experience any technical issues, please contact the
                  competition organizers immediately.
                </li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="pb-4">
              <div className="mb-4">
                <label
                  className="mb-2 block font-semibold text-gray-700 dark:text-white lg:text-lg"
                  htmlFor="teamName"
                >
                  <div className="flex flex-row items-center">
                    <AtSymbolIcon className="mr-2 inline h-5 w-5" /> Team Name
                  </div>
                  <p className="text-xs font-normal italic dark:text-gray-500 lg:text-sm">
                    Choose a creative, appropriate name for your team.
                  </p>
                </label>

                <input
                  className="focus:shadow-outline w-full appearance-none rounded-lg border border-gray-400 bg-gray-100 py-2 px-3 leading-tight text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  id="teamName"
                  type="text"
                  placeholder="Enter your team name"
                  required
                  onChange={(event) => setTeamName(event.target.value)}
                  maxLength={30}
                  value={teamName}
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block font-semibold text-gray-700 dark:text-white lg:text-lg"
                  htmlFor="teamMembers"
                >
                  <div className="flex flex-row items-center">
                    <UserGroupIcon className="mr-2 inline h-5 w-5" /> Team
                    Members
                  </div>
                  <p className="text-xs font-normal italic dark:text-gray-500 lg:text-sm">
                    {
                      'If you wish to remain anonymous, put "anonymous" in the boxes.'
                    }
                  </p>
                </label>
                <ul className="flex flex-col gap-3 rounded-xl border border-gray-400 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {teamMembers.map((member, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="flex flex-row items-center gap-2">
                        <UserIcon className="mr-2 h-5 w-5" />{" "}
                        <span className="font-semibold">
                          Member {index + 1}:
                        </span>
                        {member.name}{" "}
                        <span className="rounded-lg bg-green-200 px-2 py-1 text-xs text-green-700 xl:text-sm">
                          Age {member.age}
                        </span>
                        <span className="rounded-lg bg-yellow-200 px-2 py-1 text-xs text-yellow-700 xl:text-sm">
                          Grade {member.grade}
                        </span>
                        <span className="rounded-lg bg-blue-200 px-2 py-1 text-xs text-blue-700 xl:text-sm">
                          {member.school}
                        </span>
                      </span>

                      <button
                        type="button"
                        className="mr-1 text-red-500 duration-150 hover:text-red-700 focus:text-red-700 dark:text-red-600 dark:hover:text-red-800"
                        onClick={() => removeMember(index)}
                      >
                        <UserRemoveIcon className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                  {teamMembers.length < 4 && (
                    <li className="flex items-center gap-1">
                      <span className="flex flex-row items-center">
                        <UsersIcon className="mr-1 h-5 w-5 text-red-600 dark:text-red-500" />
                      </span>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 py-2 px-3 leading-tight text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        type="text"
                        placeholder="Add a team member"
                        value={newMember}
                        onChange={(event) => setNewMember(event.target.value)}
                        maxLength={20}
                        required={teamMembers.length < 1}
                      />
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 py-2 px-3 leading-tight text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                        max={18}
                        min={0}
                        onKeyPress={(event) => {
                          const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
                          if (input.value.length >= 2) {
                            event.preventDefault();
                          }
                        }}
                        required={teamMembers.length < 1}
                      />

                      <input
                        className="focus:shadow-outline w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 py-2 px-3 leading-tight text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        type="number"
                        placeholder="Grade Level"
                        value={grade}
                        onChange={(event) => setGrade(event.target.value)}
                        max={12}
                        min={0}
                        onKeyPress={(event) => {
                          const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
                          if (
                            input.value.length >= 2 ||
                            parseInt(input.value) > 12
                          ) {
                            event.preventDefault();
                          }
                        }}
                        required={teamMembers.length < 1}
                      />

                      <input
                        className="focus:shadow-outline w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 py-2 px-3 leading-tight text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        type="text"
                        placeholder="School Name"
                        value={school}
                        onChange={(event) => setSchool(event.target.value)}
                        maxLength={30}
                        required={teamMembers.length < 1}
                      />
                      <button
                        type="button"
                        className="ml-2 rounded-full bg-blue-500 p-1 text-white duration-150 hover:bg-blue-600 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={() => addMember()}
                      >
                        <UserAddIcon className="h-5 w-5" />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
              {teamMembers.length >= 1 &&
              newMember === "" &&
              age === "" &&
              grade == "" &&
              school === "" ? (
                <button
                  type="submit"
                  className="focus:shadow-outline flex items-center rounded-lg bg-red-600 py-2 px-3 text-sm font-bold text-white duration-150 hover:bg-red-700 focus:outline-none"
                >
                  BEGIN <ArrowRightIcon className="ml-1 inline h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center rounded-lg bg-red-600 py-2 px-3 text-sm font-bold text-white opacity-70 duration-150 hover:bg-red-700 focus:outline-none"
                >
                  BEGIN <ArrowRightIcon className="ml-1 inline h-5 w-5" />
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Test;

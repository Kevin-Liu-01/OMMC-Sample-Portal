import { NextPage } from "next";
import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  DatabaseIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Question from "./question";
import { env } from "../../env.mjs";

const questions = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const Test: NextPage = () => {
  const { data: session } = useSession();

  const [started, setStarted] = useState(false);
  const [teamName, setTeamName] = useState(
    window.localStorage.getItem("TEAM_NAME") || ""
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const savedTeamMembers = window.localStorage.getItem("TEAM_MEMBERS");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsedTeamMembers = savedTeamMembers
    ? JSON.parse(savedTeamMembers)
    : [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [teamMembers, setTeamMembers] = useState<string[]>(parsedTeamMembers);
  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    window.localStorage.setItem("TEAM_MEMBERS", JSON.stringify(teamMembers));

    window.localStorage.setItem("TEAM_NAME", teamName ? teamName : "");
  }, [teamName, teamMembers]);

  const addMember = () => {
    if (newMember.trim() !== "") {
      setTeamMembers([...teamMembers, newMember.trim()]);
      setNewMember("");
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

  return (
    <section className="z-10 col-span-7 h-[calc(100vh-3.7rem)] overflow-y-scroll bg-gray-200 p-8 dark:bg-gray-900/95">
      {started ? (
        <div className="flex flex-col">
          <div className="mb-6 flex items-center rounded-xl bg-gray-50 p-6 py-5 shadow-lg dark:bg-gray-800">
            <span className="text-lg">
              Signed in as {session ? session?.user?.name : "Guest"}
            </span>
            <button className="ml-auto flex items-center rounded-lg bg-red-600 px-2 py-1 text-white duration-150 hover:bg-red-700">
              <DatabaseIcon className="mr-1 h-5 w-5" /> Save
            </button>
            <button
              onClick={() => setStarted(!started)}
              className="ml-2 flex items-center rounded-lg bg-red-600 px-2 py-1 text-white duration-150 hover:bg-red-700"
            >
              <ArrowLeftIcon className="mr-1 h-5 w-5" /> Back
            </button>
          </div>
          {questions.map((question) => (
            <Question key={question.id} id={question.id} />
          ))}
          <button className="mt-auto rounded-lg bg-red-600 p-2 duration-150 hover:bg-red-700">
            Submit
          </button>
        </div>
      ) : (
        <div className="flex h-full flex-col ">
          <h1 className="mb-6 text-xl font-bold md:text-2xl lg:mb-8 lg:text-3xl xl:text-4xl 2xl:text-[2.8rem]">
            Welcome to the{" "}
            <span className="rounded-xl bg-red-600 px-2 py-0.5 text-white dark:bg-red-700 xl:rounded-2xl xl:px-3">
              OMMC Year 3
            </span>{" "}
            Test!
          </h1>
          <div className="mb-6 max-w-4xl rounded-xl text-xs lg:text-sm xl:text-base ">
            <h2 className="mb-4 text-xl font-bold">
              A Few Things to Keep in Mind:
            </h2>
            <ul className="mb-4 list-inside list-disc">
              <li>Please ensure that you have a stable internet connection.</li>
              <li>
                The test is not timed, so do not worry about having enough time
                to complete it.
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
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="mb-2 block font-semibold text-gray-700 dark:text-white lg:text-lg"
                  htmlFor="teamName"
                >
                  Team Name
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
                  className="mb-2 block  font-semibold text-gray-700 dark:text-white lg:text-lg"
                  htmlFor="teamMembers"
                >
                  Team Members
                  <p className="text-xs font-normal italic dark:text-gray-500 lg:text-sm">
                    {
                      'If you wish to remain anonymous, put "anonymous" in the boxes.'
                    }
                  </p>
                </label>
                <ul className="flex flex-col gap-3 rounded-xl border border-gray-400 bg-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800">
                  {teamMembers.map((member, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>
                        Member {index + 1}: {member}
                      </span>
                      <button
                        type="button"
                        className="mr-1 text-red-500 hover:text-red-700 focus:text-red-700"
                        onClick={() => removeMember(index)}
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                  {teamMembers.length < 4 && (
                    <li className="flex items-center">
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded-lg border border-gray-400 bg-gray-100 py-2 px-3 leading-tight text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        type="text"
                        placeholder="Enter team member name"
                        value={newMember}
                        onChange={(event) => setNewMember(event.target.value)}
                        maxLength={20}
                        required={teamMembers.length < 1}
                      />
                      <button
                        type="button"
                        className="ml-2 rounded-full bg-blue-500 p-1 text-white duration-150 hover:bg-blue-600 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={() => addMember()}
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
              <button
                type="submit"
                className="focus:shadow-outline flex items-center rounded-md bg-red-600 py-2 px-3 font-semibold text-white duration-150 hover:bg-red-700 focus:outline-none"
              >
                Begin <ArrowRightIcon className="ml-1 inline h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Test;

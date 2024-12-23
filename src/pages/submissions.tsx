import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChartSquareBarIcon, UserCircleIcon } from "@heroicons/react/solid";
import Head from "next/head";

import Navbar from "./components/navbar";
import Error from "./404";

interface Team {
  teamName: string;
  teamMembers: string; // This will be parsed into an array of TeamMember
  email: string;
  q1: string;
  image: string;
  q2: string;
  q3: string;
  username: string;
  started: string;
}

interface TeamMember {
  name: string;
  age: string;
  grade: string;
  school: string;
}

type TeamsData = Record<string, Team[]>;

const SubmissionsTable = () => {
  const { data: session } = useSession();

  const [submissions, setSubmissions] = useState<TeamsData>({});
  const [emails, setEmails] = useState<string>("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch("/api/submissions");
      const data: TeamsData = await res.json();
      setSubmissions(data);
    };

    const fetchEmails = async () => {
      const res = await fetch("/api/emails");
      const data = await res.json();
      setEmails(data.Test_Emails || "");
    };

    void fetchSubmissions();
    void fetchEmails();
  }, []);

  const totalCorrect = (q1: string, q2: string, q3: string): string => {
    let total = 0;
    if (q1 === '"31"') total++;
    if (q2 === '"14"') total++;
    if (q3 === '"1/2"') total++;
    return `Total correct: ${total}`;
  };

  const getTeams = Object.keys(submissions).length;

  const getTotalTeamMembers = Object.values(submissions).reduce(
    (total, teams) =>
      total +
      teams.reduce((teamTotal, team) => {
        const members: TeamMember[] = JSON.parse(team.teamMembers || "[]");
        return teamTotal + members.length;
      }, 0),
    0
  );

  const getNumberOfUserAccounts = (emails: string): number =>
    emails.trim() ? emails.split(/\s+/).length : 0;

  const getAllEmails = (emails: string): string =>
    emails.trim().replace(/\s+/g, ", ");

  return (
    <>
      {session?.user?.email === "23evanchang@gmail.com" ||
      session?.user?.email === "kk23907751@gmail.com" ||
      session?.user?.email === "billchanghaofei@gmail.com" ? (
        <>
          <Head>
            <title>User Submissions</title>
          </Head>
          <main className="min-h-[100vh] overflow-hidden bg-gray-400 font-satoshi duration-150 dark:bg-gray-900">
            <Navbar />
            <div className="z-2 pattern-cross absolute h-[calc(100vh-3.7rem)] w-full duration-150 pattern-bg-gray-300 pattern-gray-500 pattern-opacity-20 pattern-size-8 dark:pattern-gray-700 dark:pattern-bg-gray-900"></div>

            <div className="scrollbar relative z-10 h-[calc(100vh-3.7rem)] overflow-scroll p-4">
              <div className="mb-4 grid w-full border-collapse gap-2 overflow-hidden rounded-2xl bg-gray-200 p-4 dark:divide-gray-800 dark:bg-gray-700 md:grid-cols-2 md:gap-4">
                <div>
                  <h1 className="flex items-center gap-1 text-lg font-semibold">
                    <ChartSquareBarIcon className="h-8 w-8" /> TEST STATISTICS
                  </h1>
                  <div className="mt-2 flex gap-2">
                    <div className="rounded-md bg-gray-300 px-2 py-1 dark:bg-gray-800">
                      Total User Accounts: {getNumberOfUserAccounts(emails)}
                    </div>
                    <div className="rounded-md bg-gray-300 px-2 py-1 dark:bg-gray-800">
                      Total Number of Teams: {getTeams}
                    </div>
                    <div className="rounded-md bg-gray-300 px-2 py-1 dark:bg-gray-800">
                      Total Number of Team Members: {getTotalTeamMembers}
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-md bg-gray-300 shadow-inner dark:bg-gray-800">
                  <p className="scrollbar h-20 overflow-y-scroll p-3 text-sm">
                    {getAllEmails(emails)}
                  </p>
                </div>
              </div>
              <table className="w-full border-collapse divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-300 dark:divide-gray-800 dark:border-gray-600">
                <thead className="bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Team Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Started?
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Total Correct
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Q1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Q2
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Q3
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Object.entries(submissions).map(([user, teams]) =>
                    teams.map((team) => {
                      const members: TeamMember[] = JSON.parse(
                        team.teamMembers || "[]"
                      );
                      return (
                        <tr
                          key={team.username}
                          className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-[#2d394a] dark:even:bg-gray-800"
                        >
                          <td className="flex items-center gap-4 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {team.image ? (
                              <Image
                                alt="Profile picture"
                                src={team.image}
                                className="inline rounded-full"
                                height={50}
                                width={50}
                              />
                            ) : (
                              <UserCircleIcon className="h-[50px] w-[50px]" />
                            )}
                            <div className="flex flex-col">
                              <div className="text-lg">{team.username}</div>
                              <div>{team.email}</div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {members.map((member) => (
                              <div
                                key={member.name}
                                className="my-1 rounded-xl bg-gray-300 px-2 py-1 dark:bg-gray-500"
                              >
                                <p>
                                  <span className="font-semibold">Name:</span>{" "}
                                  {member.name}
                                </p>
                                <p>
                                  <span className="font-semibold">Age:</span>{" "}
                                  {member.age}
                                </p>
                                <p>
                                  <span className="font-semibold">Grade:</span>{" "}
                                  {member.grade}
                                </p>
                                <p>
                                  <span className="font-semibold">School:</span>{" "}
                                  {member.school}
                                </p>
                              </div>
                            ))}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {team.teamName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {team.started ? "✓" : "✘"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {totalCorrect(team.q1, team.q2, team.q3)}/3
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {team.q1.replace(/"/g, "")}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {team.q2.replace(/"/g, "")}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {team.q3.replace(/"/g, "")}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </>
      ) : (
        <Error />
      )}
    </>
  );
};

export default SubmissionsTable;

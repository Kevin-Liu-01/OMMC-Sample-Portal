/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
import firestore from "../../firebase";

type Data =
  | {
      data: unknown;
    }
  | {
      message: string;
    };

type SubmissionData = {
  teamMember: string;
  teamName: string;
  started: string;
  q1: string;
  q2: string;
  q3: string;
  username: string;
  email: string;
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data: SubmissionData = {
      ...req.body,
    };

    // Create a reference to the user's document
    const userDocRef = firestore.collection("data").doc(data.username);

    // Add the new submission to the user's document
    const userDocData = {
      username: data.username,
      teamName: data.teamName,
      started: data.started,
      q1: data.q1,
      q2: data.q2,
      q3: data.q3,
      teamMembers: data.teamMember,
      email: data.email,
      image: data.image,
    };
    await userDocRef.set(userDocData, { merge: true });

    return res.status(200).json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to submit data" });
  }
}

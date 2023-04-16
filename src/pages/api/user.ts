import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      csrfToken: unknown;
      name: string;
      email: string;
      password: string;
    }
  | {
      message: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userData = req.body;
  // console.log(userData);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.status(200).json(<Data>(<unknown>{ userData }));
}

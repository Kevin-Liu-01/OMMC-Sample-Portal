import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      csrfToken: any;
      name: string;
      email: string;
      password: string;
      image: any;
    }
  | {
      message: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userData = req.body;
  // console.log(userData);

  res.status(200).json({ userData });
}

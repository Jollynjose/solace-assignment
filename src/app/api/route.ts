import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  return res.status(405).json({ message: 'Not implemented' });
}

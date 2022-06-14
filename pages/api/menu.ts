import type { NextApiRequest, NextApiResponse } from 'next';
import { getStoreMenu } from '../../lib/useDominos';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const storeID = req.query.storeID as string;
  if (!storeID) {
    return res.status(400).send({ error: "Missing storeID param" });
  }
  const menu = await getStoreMenu(storeID);
  res.status(200).json(menu);
}

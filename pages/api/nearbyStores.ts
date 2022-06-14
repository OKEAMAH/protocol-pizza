import type { NextApiRequest, NextApiResponse } from 'next';
import { Address } from '../../lib/customer';
import { getNearbyStores } from '../../lib/useDominos';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = req.body as Address;
  if (!address) {
    return res.status(400).send({ error: "Invalid Address" });
  }

  const stores = await getNearbyStores(address);
  res.status(200).json({stores:stores});
}

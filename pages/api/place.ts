import type { NextApiRequest, NextApiResponse } from "next";
import { OrderRequestBody, place } from "../../lib/useDominos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as OrderRequestBody;
  if (!body) {
    return res.status(400).send({ error: "Invalid Body" });
  }
  const resp = await place(
    body.storeID,
    body.customer,
    body.address,
    body.items
  );
  res.status(200).json(resp);
}

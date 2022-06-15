import type { NextApiRequest, NextApiResponse } from "next";
import { Address, Customer } from "../../lib/customer";
import { Item } from "../../lib/item";
import { validate } from "../../lib/useDominos";

export interface ValidateRequestBody {
  storeID: string;
  customer: Customer;
  address: Address;
  items: Item[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as ValidateRequestBody;
  if (!body) {
    return res.status(400).send({ error: "Invalid Body" });
  }
  const resp = await validate(
    body.storeID,
    body.customer,
    body.address,
    body.items
  );
  res.status(200).json(resp);
}

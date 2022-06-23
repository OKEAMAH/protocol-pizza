import type { NextApiRequest, NextApiResponse } from "next";
import { OrderRequestBody, place } from "../../lib/useDominos";

export interface PlaceOrderRequestBody {
  order: OrderRequestBody;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as PlaceOrderRequestBody;
  if (body.password != process.env.PASSWORD) {
    return res.status(401).send({ error: "Invalid password" });
  }
  if (!body) {
    return res.status(400).send({ error: "Invalid Body" });
  }
  const resp = await place(
    body.order.storeID,
    body.order.customer,
    body.order.address,
    body.order.items
  );
  res.status(200).json(resp);
}

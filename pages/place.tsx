import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { useOrder } from "../lib/client/contracts/useOrder";
import { useEncryption } from "../lib/client/encryption/hooks";
import { useOfferMetadata } from "../lib/client/metadata/useOrderMetadata";
import { CHAINS } from "../lib/constants";
import { Address, Customer } from "../lib/customer";
import { Item, Order } from "../lib/item";
import { OrderRequestBody } from "../lib/useDominos";
import { PlaceOrderRequestBody } from "./api/place";

export default function Place() {
  const router = useRouter();
  const encryption = useEncryption();
  const [pizza, setPizza] = useState<Order>();
  const [storeID, setStoreID] = useState<string>();
  const [customer, setCustomer] = useState<Customer>();
  const [address, setAddress] = useState<Address>();
  const [items, setItems] = useState<Item[]>();
  const [password, setPassword] = useState<string>();
  const chainId = (router.query.chainId as string) || "137";
  const order = useOrder(Number.parseInt(chainId), CHAINS[chainId]);
  const orderAddress = (router.query.order as string) || "";
  const taker = (router.query.taker as string) || "";
  const index = (router.query.index as string) || "0";
  const offer = useOfferMetadata(
    Number.parseInt(chainId),
    orderAddress,
    taker,
    BigNumber.from(index)
  );
  const [plaintextMessage, setPlaintextMessage] = useState<string>();

  if (!offer.data) {
    return <>Loading...</>;
  }

  function decryptOffer() {
    if (!encryption.keypair?.secretKey) {
      encryption.generate();
      return;
    }
    if (
      offer.data?.messagePublicKey &&
      offer.data?.message &&
      offer.data?.messageNonce &&
      encryption.keypair?.publicKey
    ) {
      // console.log(Buffer.from(encryption.keypair.publicKey).toString("hex"));
      encryption
        .decrypt(
          offer.data.messagePublicKey,
          offer.data.message,
          offer.data.messageNonce
        )
        .then((message) => {
          setPlaintextMessage(message);
        });
    }
  }

  async function validateOffer() {
    if (!plaintextMessage) return;
    // setIsLoading(true);
    // Validate item with domino's API
    const messageData = JSON.parse(plaintextMessage);
    const storeID = messageData["storeID"];
    const address = messageData["address"];
    const customer = messageData["customer"];
    const items: Array<any> = messageData["items"];
    const body: OrderRequestBody = {
      storeID: storeID,
      customer: customer,
      address: address,
      items: items.map<Item>((item) => {
        // Strip items of validation stuff
        return {
          code: item.code,
          options: item.options,
        };
      }),
    };
    const result = await fetch(`/api/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const order = await result.json();
    console.log(order);
    if (order["status"] && order["status"] != -1) {
      setPizza(order as Order);
      setStoreID(storeID as string);
      setCustomer(customer as Customer);
      setAddress(address as Address);
      setItems(items as Item[]);
    } else {
      console.log("Error validating order");
    }
  }

  async function commit() {
    if (!offer.data) return;
    await order.contract.commit(
      offer.data?.taker,
      BigNumber.from(offer.data?.index)
    );
  }

  async function place() {
    if (!storeID || !customer || !address || !items) return;
    const body: PlaceOrderRequestBody = {
      password: password || "",
      order: {
        storeID: storeID,
        customer: customer,
        address: address,
        items: items.map<Item>((item) => {
          // Strip items of validation stuff
          return {
            code: item.code,
            options: item.options,
          };
        }),
      },
    };
    const result = await fetch(`/api/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const order = await result.json();
    console.log(order);
    if (order["status"] && order["status"] != -1) {
      console.log("PLACED");
    } else {
      console.log("Error placing order");
    }
  }

  return (
    <AppHeader>
      <div className="max-w-2xl mx-auto px-5 py-10 flex flex-col gap-10">
        <button
          className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
          onClick={() => decryptOffer()}
        >
          Decrypt Order
        </button>
        {plaintextMessage && (
          <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
            <p>Order Data</p>
            <pre className="bg-gray-100 font-mono text-xs break-words	">
              {JSON.stringify(JSON.parse(plaintextMessage), null, 2)}
            </pre>
            <button
              className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
              onClick={() => validateOffer()}
            >
              Validate
            </button>
          </div>
        )}
        {pizza && (
          <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
            <p>Commit to Offer</p>
            <div>
              <p className="text-sm mb-1">Pizza</p>
              <div className="text-sm bg-gray-100 p-2 rounded-xl">
                {pizza.products.map((product) => {
                  return (
                    <div
                      key={product.iD}
                      className="flex gap-1 items-center w-full"
                    >
                      <p>{product.name}</p>
                      <div className="flex-grow min-h-0"></div>
                      <p>${product.price}</p>
                    </div>
                  );
                })}
                <div className="flex gap-1 items-center w-full">
                  <p>Delivery Free</p>
                  <div className="flex-grow min-h-0"></div>
                  <p>${pizza.amountsBreakdown.deliveryFee}</p>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <p>Tax</p>
                  <div className="flex-grow min-h-0"></div>
                  <p>${pizza.amountsBreakdown.tax}</p>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <p>Tip (20%)</p>
                  <div className="flex-grow min-h-0"></div>
                  <p>${pizza.amountsBreakdown.customer * 0.2}</p>
                </div>
                <div className="flex gap-1 items-center border-t-2 w-full">
                  <p className="font-bold">Total (USD)</p>
                  <div className="flex-grow min-h-0"></div>
                  <p className="font-bold">
                    $
                    {pizza.amountsBreakdown.customer +
                      pizza.amountsBreakdown.customer * 0.2}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm mb-1">Offer</p>
              <div className="text-sm bg-gray-100 p-2 rounded-xl">
                <div className="flex gap-1 items-center w-full">
                  <p>Token</p>
                  <div className="flex-grow min-h-0"></div>
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(
                        offer.data?.tokenAddress || ""
                      );
                    }}
                    className="underline cursor-pointer"
                  >
                    {offer.data.token.name}
                  </p>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <p>Payment</p>
                  <div className="flex-grow min-h-0"></div>
                  <p>{offer.data.price}</p>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <p>Buyer Cost</p>
                  <div className="flex-grow min-h-0"></div>
                  <p>{offer.data.buyersCost}</p>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <p>Seller Stake</p>
                  <div className="flex-grow min-h-0"></div>
                  <p>{offer.data.sellersStake}</p>
                </div>
                <div className="flex gap-1 items-center border-t-2 w-full">
                  <p className="font-bold">Buyer</p>
                  <div className="flex-grow min-h-0"></div>
                  <p className="font-bold">{offer.data.taker}</p>
                </div>
              </div>
            </div>
            <p>Offer state: {offer.data.state}</p>
            {offer.data.state == "Open" && (
              <button
                className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
                onClick={() => commit()}
              >
                Commit
              </button>
            )}
          </div>
        )}
        {pizza && (
          <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
            <p>Commit to Offer</p>
            <input
              className="bg-gray-100 rounded-xl px-3 py-1 w-full "
              placeholder="Password"
              type={"text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
              onClick={() => place()}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </AppHeader>
  );
}

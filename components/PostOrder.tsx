import { LockClosedIcon, RefreshIcon } from "@heroicons/react/solid";
import { BigNumber, utils } from "ethers";
import { useState } from "react";
import { useNetwork } from "wagmi";
import { useOrder } from "../lib/client/contracts/useOrder";
import { useEncryption } from "../lib/client/encryption/hooks";
import { CHAINS } from "../lib/constants";
import { Customer, Address } from "../lib/customer";
import { postJSONToIPFS } from "../lib/ipfs";
import { Item, Order } from "../lib/item";
import { OrderRequestBody } from "../lib/useDominos";

export default function PostOrder({
  pizza,
  storeID,
  customer,
  address,
  items,
}: {
  pizza: Order;
  storeID: string;
  customer: Customer;
  address: Address;
  items: Item[];
}) {
  const encryption = useEncryption();
  const network = useNetwork();
  const id = network.activeChain?.id || 42;
  const order = useOrder(network.activeChain?.id || 42, CHAINS[id]);
  const [tokenAddress, setTokenAddress] = useState("");
  const [paymentAmount, setPaymentAmount] = useState<number>();
  const [sellerDeposit, setSellerDeposit] = useState<number>();
  const [buyerCost, setBuyerCost] = useState<number>();
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  async function onSubmit() {
    if (!order.metadata.data?.encryptionPublicKey) {
      console.error("Order has no encryption key");
      return;
    }

    // Upload pizza json to IPFS
    setLoadingMessage("Uploading");
    const json: OrderRequestBody = {
      storeID: storeID,
      address: address,
      customer: customer,
      items: items,
    };

    const data = await encryption.encrypt(
      order.metadata.data?.encryptionPublicKey,
      JSON.stringify(json)
    );

    const cid = await postJSONToIPFS(data);

    // Submit offer
    setLoadingMessage("Submitting");
    await order.contract.submitOffer(
      BigNumber.from(`0x${Buffer.from(utils.randomBytes(16)).toString("hex")}`),
      tokenAddress,
      BigNumber.from(paymentAmount),
      BigNumber.from(buyerCost),
      BigNumber.from(sellerDeposit),
      BigNumber.from(60 * 60 * 24 * 2),
      `ipfs://${cid}`
    );
    setLoadingMessage("");
    setIsSuccess(true);
  }

  async function onGenerate() {
    await encryption.generate();
  }

  if (!encryption.hasKey) {
    return (
      <>
        <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
          <p>Is it cool if this website encrypts your shipping info?</p>
          <button
            className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
            onClick={() => onGenerate()}
          >
            <LockClosedIcon className="h-4 w-4" /> Ya, go for it dude
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {!isSuccess && (
        <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
          <p>Post Order</p>
          <div>
            <p className="text-sm mb-1">Summary</p>
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
                <p>${pizza.amountsBreakdown.customer * .2}</p>
              </div>
              <div className="flex gap-1 items-center border-t-2 w-full">
                <p className="font-bold">Total (USD)</p>
                <div className="flex-grow min-h-0"></div>
                <p className="font-bold">${pizza.amountsBreakdown.customer + (pizza.amountsBreakdown.customer * .2)}</p>
              </div>
            </div>
          </div>
          <input
            className="bg-gray-100 rounded-xl px-3 py-1 w-full "
            placeholder="Token Address"
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          ></input>
          <input
            className="bg-gray-100 rounded-xl px-3 py-1 w-full "
            placeholder="Payment Amount"
            type={"number"}
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
          ></input>
          <input
            className="bg-gray-100 rounded-xl px-3 py-1 w-full "
            placeholder="Seller Deposit"
            type={"number"}
            value={sellerDeposit}
            onChange={(e) => setSellerDeposit(parseFloat(e.target.value))}
          ></input>
          <input
            className="bg-gray-100 rounded-xl px-3 py-1 w-full "
            placeholder="Buyer Cost"
            type={"number"}
            value={buyerCost}
            onChange={(e) => setBuyerCost(parseFloat(e.target.value))}
          ></input>
          {!loadingMessage && (
            <button
              className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
              onClick={() => onSubmit()}
            >
              Post Order
            </button>
          )}
          {loadingMessage && (
            <div className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1">
              {loadingMessage}
              <RefreshIcon className="h-4 w-4 animate-reverse-spin" />
            </div>
          )}
        </div>
      )}
      {isSuccess && (
        <p className="break-words">
          Your offer has been submitted! You can check its status at:{" "}
          <a
            href="https://www.rwtp.org/account/purchases"
            className="underline text-blue-500"
          >
            https://www.rwtp.org/account/purchases
          </a>
        </p>
      )}
    </>
  );
}

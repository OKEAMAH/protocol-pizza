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
import { useTokenMethods } from "../lib/tokens";
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
  const tokenMethods = useTokenMethods(tokenAddress);
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

    if (!tokenMethods.decimals.data) return;
    const decimals = BigNumber.from(
      Math.pow(10, Number.parseInt(tokenMethods.decimals.data.toString()))
    );

    // Approve tokens
    setLoadingMessage(`Requesting tokens`);
    const approveTxHash = await approveTokens(decimals);
    if (!approveTxHash) return;

    // Submit offer
    setLoadingMessage("Submitting");
    await order.contract.submitOffer(
      BigNumber.from(`0x${Buffer.from(utils.randomBytes(16)).toString("hex")}`), // random index
      tokenAddress,
      BigNumber.from(paymentAmount).mul(decimals),
      BigNumber.from(buyerCost).mul(decimals),
      BigNumber.from(sellerDeposit).mul(decimals),
      BigNumber.from(60 * 60 * 24 * 2), // 2 day timeout
      `ipfs://${cid}`
    );
    setLoadingMessage("");
    setIsSuccess(true);
  }

  function transferAmount(decimals: BigNumber): BigNumber {
    const price = BigNumber.from(paymentAmount).mul(decimals);
    const cost = BigNumber.from(buyerCost).mul(decimals);
    return cost.gt(price) ? price.add(cost.sub(price)) : price;
  }

  async function approveTokens(
    decimals: BigNumber
  ): Promise<string | undefined> {
    if (!order.metadata.data) return;
    try {
      const tx = await tokenMethods.approve.writeAsync({
        args: [CHAINS[id], transferAmount(decimals)],
      });
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.log(error);
      return undefined;
    }
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

  const tip = Math.round(pizza.amountsBreakdown.customer * 0.2 * 100) / 100;
  const total = Math.round((pizza.amountsBreakdown.customer + tip) * 100) / 100;

  return (
    <>
      {!isSuccess && (
        <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
          <p>Post Order</p>
          <div>
            <p className="text-sm mb-1">Order Cost</p>
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
                <p>${tip}</p>
              </div>
              <div className="flex gap-1 items-center border-t-2 w-full">
                <p className="font-bold">Total (USD)</p>
                <div className="flex-grow min-h-0"></div>
                <p className="font-bold">${total}</p>
              </div>
            </div>
          </div>
          <p className="text-sm">Your Offer</p>
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
            <>
              {!tokenMethods.decimals.data &&
                !tokenMethods.decimals.isLoading && (
                  <button className="w-full bg-red-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1 cursor-not-allowed">
                    Invalid Token
                  </button>
                )}
              {!tokenMethods.decimals.data &&
                tokenMethods.decimals.isLoading && (
                  <button className="w-full bg-gray-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1 cursor-not-allowed">
                    Loading Token
                  </button>
                )}
              {tokenMethods.decimals.data && (
                <button
                  className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
                  onClick={() => onSubmit()}
                >
                  Post Order
                </button>
              )}
            </>
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

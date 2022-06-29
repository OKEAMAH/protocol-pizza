import { ChevronDownIcon, RefreshIcon } from "@heroicons/react/solid";
import { BigNumber, utils } from "ethers";
import { useState } from "react";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractWrite,
  useNetwork,
  useToken,
} from "wagmi";
import { useOrder } from "../lib/client/contracts/useOrder";
import { useEncryption } from "../lib/client/encryption/hooks";
import { CHAINS } from "../lib/constants";
import { Customer, Address } from "../lib/customer";
import { postJSONToIPFS } from "../lib/ipfs";
import { Item, Order } from "../lib/item";
import { OrderRequestBody } from "../lib/useDominos";
import TokenModal from "./TokenModal";

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
  const token = useToken({ address: tokenAddress });
  const approve = useContractWrite(
    {
      addressOrName: tokenAddress,
      contractInterface: erc20ABI,
    },
    "approve"
  );
  const [paymentAmount, setPaymentAmount] = useState<string>();
  const sellerDeposit = "0";
  const buyerCost = paymentAmount;
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const account = useAccount();
  const balance = useBalance({
    addressOrName: account.data?.address,
    token: token.data?.address,
  });

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

    if (!token.data) return;
    let decimals = token.data.decimals;

    // Approve tokens
    setLoadingMessage(`Requesting tokens`);
    const approveTxHash = await approveTokens(decimals);
    if (!approveTxHash) return;

    // Submit offer
    setLoadingMessage("Submitting");
    await order.contract.submitOffer(
      BigNumber.from(`0x${Buffer.from(utils.randomBytes(16)).toString("hex")}`), // random index
      tokenAddress,
      utils.parseUnits(paymentAmount || "0", decimals),
      utils.parseUnits(buyerCost || "0", decimals),
      utils.parseUnits(sellerDeposit || "0", decimals),
      BigNumber.from(60 * 60 * 24 * 2), // 2 day timeout
      `ipfs://${cid}`
    );
    setLoadingMessage("");
    setIsSuccess(true);
  }

  function transferAmount(decimals: number): BigNumber {
    const price = utils.parseUnits(paymentAmount || "0", decimals);
    const cost = utils.parseUnits(buyerCost || "0", decimals);
    return cost.gt(price) ? price.add(cost.sub(price)) : price;
  }

  async function approveTokens(decimals: number): Promise<string | undefined> {
    if (!order.metadata.data) return;
    try {
      const tx = await approve.writeAsync({
        args: [CHAINS[id], transferAmount(decimals)],
      });
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.log(error);
      return undefined;
    }
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
          <div className="flex bg-gray-100 rounded-xl p-3 w-full gap-2">
            <input
              className="bg-gray-100 flex-grow border-none focus:ring-0 focus:outline-0"
              type="text"
              placeholder="Payment Amount"
              value={paymentAmount}
              onChange={(e) => {
                setPaymentAmount(e.target.value);
              }}
            ></input>
            <div className="flex flex-col">
              <TokenModal setTokenAddress={setTokenAddress}>
                <div className="flex items-center justify-center gap-1 bg-white rounded px-3 py-1 hover:bg-gray-50 cursor-pointer">
                  <p className="font-semibold">{token.data?.symbol || ""}</p>
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </TokenModal>
              <div className="truncate text-xs text-center">
                Balance: {balance.data?.formatted.slice(0, 7) ?? "0.0"}
              </div>
            </div>
          </div>
          {!loadingMessage && (
            <>
              {!token.isLoading && token.error && (
                <button className="w-full bg-red-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1 cursor-not-allowed">
                  Invalid Token
                </button>
              )}
              {token.isLoading ||
                (balance.isLoading && (
                  <button className="w-full bg-gray-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1 cursor-not-allowed">
                    Loading Token
                  </button>
                ))}
              {token.isSuccess && balance.isSuccess && (
                <>
                  {balance.data?.value &&
                  balance.data.value.gte(
                    utils.parseUnits(
                      paymentAmount || "0",
                      token.data?.decimals ?? 0
                    )
                  ) ? (
                    <>
                      <button
                        className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
                        onClick={() => onSubmit()}
                      >
                        Post Order
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="w-full bg-red-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1 cursor-not-allowed">
                        Insufficient Balance
                      </button>
                    </>
                  )}
                </>
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

import { Order } from "rwtp";
import { BigNumber, Transaction } from "ethers";
import { useOrderMetadata } from "../metadata/useOrderMetadata";
import { useContract, useSigner } from "wagmi";

interface OrderMethods {
  submitOffer: (
    index: BigNumber,
    token: string,
    price: BigNumber,
    buyersCost: BigNumber,
    sellerStake: BigNumber,
    timeout: BigNumber,
    uri: string
  ) => Promise<Transaction>;
}

// Lets you use the metadata from useOrderMetadata and useContract from ethers
export function useOrder(chainId: number, address: string) {
  const signer = useSigner();
  const metadata = useOrderMetadata(chainId, address);
  const contract = useContract<OrderMethods>({
    addressOrName: address,
    contractInterface: Order.abi,
    signerOrProvider: signer.data,
  });

  return {
    metadata,
    contract,
  };
}

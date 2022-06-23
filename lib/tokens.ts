import { useContractWrite, useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { fromBn } from "evm-bn";
import { ERC20 } from "./erc20";

export interface ERC20Data {
  decimals: number;
  symbol: string;
  name: string;
  address: string;
}

export function useTokenMethods(address: string) {
  const approve = useContractWrite(
    {
      addressOrName: address,
      contractInterface: ERC20.abi,
    },
    "approve"
  );

  const decimals = useContractRead(
    {
      addressOrName: address,
      contractInterface: ERC20.abi,
    },
    "decimals"
  );

  const useBalance = (args: any) =>
    useContractRead(
      {
        addressOrName: address,
        contractInterface: ERC20.abi,
      },
      "balanceOf",
      {
        args: args,
      }
    );

  return {
    approve,
    decimals,
    useBalance,
  };
}

export function formatTokenAmount(amount: string, decimals: number) {
  return fromBn(BigNumber.from(amount ? amount : 0), decimals);
}

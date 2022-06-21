import useSWR from "swr";
import { request } from "graphql-request";

const RINKEBY = "https://api.thegraph.com/subgraphs/name/rwtp/rinkeby";
const OPTIMISM = "https://api.thegraph.com/subgraphs/name/rwtp/optimism";
const KOVAN = "https://api.thegraph.com/subgraphs/name/rwtp/kovan";
const MAINNET = "https://api.thegraph.com/subgraphs/name/rwtp/mainnet";
const POLYGON = "https://api.thegraph.com/subgraphs/name/rwtp/polygon";

const fetcher = (url: string, query: any, variables: any) =>
  request(url, query, variables);

export function useSubgraph<T>(chainId: number, args: string | [string, any]) {
  let chain = OPTIMISM;
  if (chainId === 4) {
    chain = RINKEBY;
  } else if (chainId === 42) {
    chain = KOVAN;
  } else if (chainId === 1) {
    chain = MAINNET;
  } else if (chainId === 137) {
    chain = POLYGON;
  }

  return useSWR<T>([chain, ...[args]].flat(), fetcher);
}

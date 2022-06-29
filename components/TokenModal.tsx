import { XIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TokenList } from "@uniswap/token-lists";
import useSWR from "swr";
import { useToken } from "wagmi";

export default function TokenModal({
  children,
  setTokenAddress,
}: {
  children: React.ReactNode;
  setTokenAddress: Dispatch<SetStateAction<string>>;
}) {
  const [showTokenSelect, setShowTokenSelect] = useState(false);
  const [customTokenAddress, setCustomTokenAddress] = useState<string>();
  const [tokenList, setTokenList] = useState<TokenList>();
  const customToken = useToken({ address: customTokenAddress });

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    "https://api-polygon-tokens.polygon.technology/tokenlists/default.tokenlist.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      setTokenList(data);
      setTokenAddress((data as TokenList).tokens[0].address);
    }
  }, [data, setTokenAddress]);

  if (!tokenList) return <>Loading</>;

  return (
    <>
      {showTokenSelect && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center p-5">
          <div className="bg-white max-w-md mx-auto w-full rounded-xl p-3">
            <div className="flex justify-between items-center cursor-pointer mb-3">
              <p>Select a token</p>
              <XIcon
                className="h-4 w-4"
                onClick={() => {
                  setShowTokenSelect(false);
                }}
              />
            </div>
            <div className="flex flex-wrap justify-left">
              <div className="w-full p-1">
                <div className="flex border rounded-xl px-3 py-1">
                  <input
                    className="flex-grow focus:ring-0 focus:outline-0"
                    placeholder="Custom token address"
                    value={customTokenAddress}
                    onChange={(e) => {
                      setCustomTokenAddress(e.target.value);
                    }}
                  ></input>
                  <button
                    className="bg-green-500 px-3 py-1 rounded-xl text-white disabled:bg-gray-500"
                    disabled={!customToken.isSuccess}
                    onClick={() => {
                      if (!customTokenAddress) return;
                      setTokenAddress(customTokenAddress);
                      setShowTokenSelect(false);
                      setCustomTokenAddress("");
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
              {tokenList.tokens.map((token) => {
                return (
                  <div className="w-1/3 p-1" key={token.address}>
                    <div
                      className="flex p-2 gap-2 border rounded-xl p-1 cursor-pointer"
                      onClick={() => {
                        setTokenAddress(token.address);
                        setShowTokenSelect(false);
                      }}
                    >
                      <img
                        alt="token logo"
                        src={token.logoURI}
                        className="h-8 aspect-square rounded-full my-auto"
                      ></img>
                      <div className="flex flex-col overflow-hidden">
                        <p>{token.symbol}</p>
                        <p className="text-xs w-full text-gray-500 truncate ">
                          {token.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setShowTokenSelect(true);
        }}
      >
        {children}
      </div>
    </>
  );
}

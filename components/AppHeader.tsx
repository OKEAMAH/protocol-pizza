import {
  FingerPrintIcon,
  RefreshIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { useRouter } from "next/router";
import { useNetwork, useWaitForTransaction } from "wagmi";

export function AppHeader(props: {
  children: React.ReactNode;
  txHash?: string;
}) {
  const { switchNetwork } = useNetwork();
  // const chainId = useChainId();
  const router = useRouter();
  const waitForTransaction = useWaitForTransaction({
    hash: props.txHash,
  });
  return (
    <div className="h-full">
      <div className="flex flex-row justify between items-center p-5 gap-2">
        <div className="w-1/3">
          <Link href="/" passHref>
            <div className="text-2xl sm:text-3xl">🍕</div>
          </Link>
        </div>

        <div className="w-1/3 min-w-fit">
          <div className="flex flex-row mx-auto w-min text-base sm:text-lg bg-white rounded-xl p-1 ">
            <Link href="/order" passHref>
              <div
                className={"rounded-xl px-3 py-1 ".concat(
                  router.pathname == "/order"
                    ? "bg-gray-50 font-semibold"
                    : "cursor-pointer opacity-50 hover:opacity-100"
                )}
              >
                Order
              </div>
            </Link>
            <Link href="/market" passHref>
              <div
                className={"rounded-xl px-3 py-1 ".concat(
                  router.pathname == "/market"
                    ? "bg-gray-50 font-semibold"
                    : "cursor-pointer opacity-50 hover:opacity-100"
                )}
              >
                Market
              </div>
            </Link>
          </div>
        </div>

        <div className="w-1/3 min-w-fit">
          <div className="flex justify-end gap-2 ">
            <div>
              <ConnectButton.Custom>
                {({
                  account,
                  mounted,
                  chain,
                  openConnectModal,
                  openChainModal,
                  openAccountModal,
                }) => {
                  if (!mounted || !account || !chain || !switchNetwork) {
                    return (
                      <button
                        className="bg-white text-base sm:text-lg rounded-xl px-3 py-2 flex items-center gap-1"
                        onClick={openConnectModal}
                      >
                        Connect Wallet <FingerPrintIcon className="h-4 w-4" />
                      </button>
                    );
                  }

                  //   if (chain.id != chainId) {
                  //     return (
                  //       <button
                  //         className="bg-white  text-sm border-black rounded-xl px-3 py-1 flex items-center"
                  //         onClick={() => switchNetwork(chainId)}
                  //       >
                  //         Switch Network{' '}
                  //         <SwitchHorizontalIcon className="h-4 w-4 ml-2" />
                  //       </button>
                  //     );
                  //   }

                  const keyDetails = (
                    <>
                      <span className="text-gray-400">0x</span>
                      {account.address.substring(2, 6)}
                      <span className="text-gray-400">...</span>
                      {account.address.substring(
                        account.address.length - 4,
                        account.address.length
                      )}
                    </>
                  );
                  return (
                    <FadeIn className="flex items-center gap-2">
                      <button
                        className="text-lg bg-white  rounded-xl px-3 py-1 flex items-center font-mono hover:opacity-50"
                        onClick={() => openChainModal()}
                      >
                        {chain.name}
                        <SwitchHorizontalIcon className="h-4 w-4 ml-2" />
                      </button>
                      {waitForTransaction.status != "loading" && (
                        <button
                          className="text-lg bg-white  rounded-xl px-3 py-1 flex items-center font-mono hover:opacity-50"
                          onClick={() => openAccountModal()}
                        >
                          {account.ensName ? account.ensName : keyDetails}
                          <FingerPrintIcon className="h-4 w-4 ml-2" />
                        </button>
                      )}
                      {waitForTransaction.status == "loading" && (
                        <div className="text-lg animate-pulse bg-white rounded-xl px-3 py-1 flex items-center font-mono hover:opacity-50">
                          Transaction pending
                          <RefreshIcon className="animate-spin h-4 w-4 ml-2" />
                        </div>
                      )}
                    </FadeIn>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        </div>
      </div>
      <>{props.children}</>
    </div>
  );
}

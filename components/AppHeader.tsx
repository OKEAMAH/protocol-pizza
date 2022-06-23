import {
  FingerPrintIcon,
  RefreshIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FadeIn } from "./FadeIn";
import { useNetwork, useWaitForTransaction } from "wagmi";

export function AppHeader(props: {
  children: React.ReactNode;
  txHash?: string;
}) {
  const { switchNetwork } = useNetwork();
  // const chainId = useChainId();
  const waitForTransaction = useWaitForTransaction({
    hash: props.txHash,
  });
  return (
    <div className="flex-grow ">
      <div className="flex sm:flex-row flex-col-reverse items-center justify-between p-5 gap-4">
        <div className="flex gap-2">
          <div className="text-3xl">🍕</div>
          <div className="flex flex-col">
            <p className="text-2xl font-black leading-none">Protocol Pizza</p>
            <p className="text-sm leading-none">
              Powered by{" "}
              <a
                href="https://rwtp.org"
                target="_blank"
                className="underline text-sky-500"
              >
                RWTP
              </a>
            </p>
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

                  if (chain.id != 42 && chain.id != 137) {
                    return (
                      <button
                        className="bg-white text-base sm:text-lg rounded-xl px-3 py-2 flex items-center gap-1"
                        onClick={() => openChainModal()}
                      >
                        Switch Network{" "}
                        <SwitchHorizontalIcon className="h-4 w-4 ml-2" />
                      </button>
                    );
                  }

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

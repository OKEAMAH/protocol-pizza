import { FingerPrintIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function HasWalletConnected({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = useAccount();

  return (
    <>
      <ConnectButton.Custom>
        {({ account, mounted, chain, openConnectModal, openChainModal }) => {
          console.log(chain);
          if (!mounted || !account || !chain) {
            return (
              <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
                <p>Connect your wallet to submit an offer.</p>
                <button
                  className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
                  onClick={openConnectModal}
                >
                  Connect Wallet <FingerPrintIcon className="h-4 w-4" />
                </button>
              </div>
            );
          } else if (chain.unsupported) {
            return (
              <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
                <p>Switch to a supported network.</p>
                <button
                  className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
                  onClick={openChainModal}
                >
                  Switch Network <SwitchHorizontalIcon className="h-4 w-4" />
                </button>
              </div>
            );
          } else {
            return <>{children}</>;
          }
        }}
      </ConnectButton.Custom>
    </>
  );
}

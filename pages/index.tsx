import { FingerPrintIcon, PhoneIcon, UserIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import solidity from "react-syntax-highlighter/dist/cjs/languages/prism/solidity";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { BigNumber } from "ethers";

SyntaxHighlighter.registerLanguage("solidity", solidity);
SyntaxHighlighter.registerLanguage("typescript", typescript);

export default function Landing() {

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 flex flex-col gap-10">
      <div>
        <p className="text-3xl">2003 Porsche 911 Carrera 4S</p>
        <p className="text-sm">
          listed on{" "}
          <a
            href="https://rwtp.org"
            target="_blank"
            className="underline text-sky-500"
          >
            RWTP
          </a>
        </p>
      </div>
      <div>
        <div className="border border-2 rounded p-5">
          <div className="flex flex-col text-center sm:text-left sm:flex-row gap-3">
            <img
              alt=""
              className="w-20 h-20 md:h-32 md:w-32 my-auto mx-auto rounded-full"
              src="https://pbs.twimg.com/profile_images/1522060685563162624/szdLTUzW_400x400.jpg"
            ></img>
            <div className="flex flex-col w-full overflow-hidden">
              <p className="font-bold text-xl">Seller</p>
              <div className="flex flex-row gap-1 mx-auto sm:mx-0 overflow-hidden">
                <UserIcon className="h-4 my-auto shrink-0" />
                <p className="text-sm">Orion Parrott</p>
              </div>
              <div
                className="flex flex-row gap-1 cursor-pointer mx-auto sm:mx-0 overflow-hidden"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "0x76a39362920FBF54365281b43DaAcA59F81BB3c4"
                  );
                }}
              >
                <FingerPrintIcon className="h-4 my-auto shrink-0" />
                <p className="text-sm truncate">
                  0x76a39362920FBF54365281b43DaAcA59F81BB3c4
                </p>
              </div>
              <div className="flex flex-row gap-1 mx-auto sm:mx-0 overflow-hidden">
                <img
                  alt=""
                  src="/twitter.svg"
                  className="h-4 my-auto shrink-0"
                />
                <a
                  href="https://twitter.com/OrionParrott"
                  className="text-sm  underline text-sky-500"
                  target="_blank"
                >
                  @orionParrot
                </a>
              </div>
              <div className="flex flex-row gap-1 mx-auto sm:mx-0 overflow-hidden">
                <PhoneIcon className="h-4 my-auto shrink-0" />
                <p className="text-sm">(916)-761-5961</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold">Description</p>
        <p className="mb-1">
          2003 911 Carrera 4S 6-speed. Fantastic car, very clean all around.
          Selling ONLY because of new baby.
        </p>
        <p className="mb-1">
          Clear title in hand. Have owned for 7 years, since 60K miles.
          Maintenance is up to date with records and Carfax available on
          request.
        </p>
        <p>
          IMS bearing done at 60K miles. Turbo twist wheels have some scuffs.
          Good tires. Alpine CD with bluetooth. Original factory radio included.
          2 keys. Garage kept.
        </p>
      </div>
      <div>
        <p className="text-xl font-bold">Details</p>
        <p>
          <span className="font-semibold">Location:</span> San Francisco
          (SOMA/South Beach)
        </p>
        <p>
          <span className="font-semibold">VIN:</span> WP0AA29993S623513
        </p>
        <p>
          <span className="font-semibold">PCA Member:</span> 2010090467
        </p>
        <p>
          <span className="font-semibold">Odometer:</span> 94,000 miles
        </p>
        <p>
          <span className="font-semibold">Condition:</span> Excellent
        </p>
        <p>
          <span className="font-semibold">Paint:</span> Silver
        </p>
        <p>
          <span className="font-semibold">Transmission:</span> 6-speed manual
        </p>
        <p>
          <span className="font-semibold">Cylinders:</span> 6
        </p>
      </div>
      <div>
        <p className="text-xl font-bold">Submit Offer</p>
        <div className="flex flex-row w-full gap-3 mt-3">
          <p>Fulfillment Period:</p>
          <div className="grow border h-0 my-auto"></div>
          <p>14 days</p>
        </div>
        <div className="flex flex-row w-full gap-3">
          <p>Seller Stakes:</p>
          <div className="grow border h-0 my-auto"></div>
          <p>1 wETH</p>
        </div>
        <div className="flex flex-row w-full gap-3">
          <p className="font-semibold">You Stake:</p>
          <div className="grow border h-0 my-auto"></div>
          <p>0.05 wETH</p>
        </div>
        <div className="flex flex-row w-full gap-3 mb-2">
          <p className="font-semibold">You Pay:</p>
          <div className="grow border h-0 my-auto"></div>
          <p>20 wETH</p>
        </div>
        <div>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold">F.A.Q.</p>
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-semibold tex-lg">Is it still available?</p>
            <p>
              Yes. The submit offer button will automatically disable if the
              seller has committed to another offer.
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">How does this work?</p>
            <p>
              The seller created a listing on the{" "}
              <a
                className="text-sky-500 underline"
                href="https://rwtp.org"
                target={"_blank"}
              >
                RWTP
              </a>
              , a smart contract deployed on blockchains like Ethereum. This
              lets them sell a physical object to anyone in crypto:
            </p>
            <ol className="list-decimal list-inside">
              <li>Buyer submits an offer with these details:</li>
              <ol className="list-disc list-outside ml-5">
                <li>
                  Fulfillment period: Time after commitment before fulfillment
                  is auto-confirmed.
                </li>
                <li>
                  Seller's stake: Amount seller deposits to guarantee
                  fulfillment.
                </li>
                <li>
                  Buyer's stake: Amount buyer deposits to guarantee they won't
                  reject unnecessarily.
                </li>
                <li>
                  Buyer's payment: Amount the buyer is paying for the item.
                </li>
                <li>Offer data: Amount the buyer is paying for the item.</li>
              </ol>
              <li>
                Seller commits to the offer and submits their half of the
                payment.
              </li>
              <li>
                Once fulfillment is complete, the buyer can confirm the order
                returning stakes and sending payment to the seller.
                Alternatively, if the seller didn't hold up their end of the
                deal, they have two options:
              </li>
              <ol className="list-disc list-inside ml-5">
                <li>
                  Request cancellation: Buyer requests that seller also cancels,
                  if both agree stakes are returned and buyer is refunded.
                </li>
                <li>
                  Slash stakes: As a last resort the buyer can permanently
                  delete both stakes and the purchase amount.
                </li>
              </ol>
            </ol>
            <p>
              <a
                href="https://rwtp.org/docs"
                className="text-sky-500 underline"
                target={"_blank"}
              >
                Learn more at rwtp.org/docs
              </a>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">
              How do I know I will get the Porsche?
            </p>
            <p>
              Inspect the seller details and the seller stake to determine if
              the offer has an acceptable risk level. If it doesn't you can
              increase the seller's stake.
            </p>
            <p></p>
          </div>
          <div>
            <p className="font-semibold text-lg">
              Will you deliver the car to me?
            </p>
            <p>
              No. Meetup will be arranged via email after an offer is confirmed.
              It will be within reasonable distance of the listing's location.
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">
              Can I sell something in crypto?
            </p>
            <p>
              Absolutely! To sell anything (legal) in crypto go to{" "}
              <a
                href="https://rwtp.org/sell/new"
                target={"_blank"}
                className="underline text-sky-500"
              >
                rwtp.org/sell/new
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { AlertCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";

export default function DashboardPage() {
  const account = useAccount();
  const { data: nextAuthSession } = useSession();
  const { openConnectModal } = useConnectModal();
  const { sendTransaction } = useSendTransaction();

  useEffect(() => {
    // Check if the user is authenticated
    if (nextAuthSession?.user) {
      console.log("User is authenticated:", nextAuthSession.user.username);
    }
  }, [nextAuthSession]);

  const [issueUrl, setIssueUrl] = useState("");
  const [bountyAmount, setBountyAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error state

    // Check if wallet is connected
    if (account.status === "disconnected" && openConnectModal) {
      // If not connected, open the connect modal
      openConnectModal();
    } else {
      // If connected, you can proceed with form submission logic
      console.log("Wallet is connected:", account.address);
      // Function to get the issueUrl and split it into the github repo and issue number
      const issueParts = issueUrl.split("/");
      if (issueParts.length < 5) {
        console.error("Invalid issue URL");
        return;
      }
      const repo = `${issueParts[0]}/${issueParts[1]}/${issueParts[2]}/${issueParts[3]}/${issueParts[4]}`;
      const issueNumber = issueParts[issueParts.length - 1];
      console.log("Repository:", repo);
      console.log("Issue Number:", issueNumber);

      // POST request to create a bounty
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/github/bounties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo: repo.trim(),
          issue: issueNumber.trim(),
          amount: bountyAmount.trim(),
          coin: "ETH",
          chain_id: "11155111",
          bountyOwner: nextAuthSession?.user?.username,
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log("Bounty created:", data);
          // Transfer assets to treasury
          try {
            await sendTransaction({
              to:
                (process.env.NEXT_PUBLIC_TREASURY_ADDRESS as `0x${string}`) ||
                "",
              value: parseEther(bountyAmount),
            });
            console.log(`Sent ${bountyAmount} ETH to treasury!`);

            // Optionally, you can show a success message
            toast(
              "Your bounty has been created and the ETH has been sent to the treasury!"
            );
          } catch (err) {
            console.error("Error sending ETH:", err);
            setError(
              "There was an error sending the ETH to the treasury. Please try again."
            );
          }
        })
        .catch((error) => {
          // Handle error from the API
          setError("Error creating bounty. Please try again.");
          console.error("Error creating bounty:", error);
        });
    }
  };

  return (
    <div className="min-h-[100vh] md:min-h-min">
      {/* IFTTT like input boxes with timeline */}
      <div className="mt-12 p-12 max-w-3xl mx-auto bg-muted/50 rounded-xl">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create a Bounty</h2>
          <p className="text-muted-foreground mb-6">
            Use the form below to create a new bounty linked to issues in your
            project.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-3 border border-zinc-800 rounded-lg p-4">
            <Label htmlFor="issueURL">If the following GitHub issue</Label>
            <Input
              type="text"
              placeholder="GitHub issue URL..."
              value={issueUrl}
              onChange={(e) => setIssueUrl(e.target.value)}
            />
          </div>

          {/* <div className="pl-0.5 h-10 w-0 mx-auto bg-zinc-600" /> */}
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-down-icon lucide-move-down text-zinc-600"
            >
              <path d="M8 18L12 22L16 18" />
              <path d="M12 2V22" />
            </svg>
          </div>

          <div className="grid w-full items-center gap-3 border border-zinc-800 rounded-lg p-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Receives a successful Pull Request">
                  Receives a successful Pull Request
                </SelectItem>
                <SelectItem value="Gets 10 👍 reactions">
                  Gets 10 👍 reactions
                </SelectItem>
                <SelectItem value="A milestone is completed">
                  Completes a milestone
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-down-icon lucide-move-down text-zinc-600"
            >
              <path d="M8 18L12 22L16 18" />
              <path d="M12 2V22" />
            </svg>
          </div>

          <div className="grid w-full items-center gap-3 border border-zinc-800 rounded-lg p-4">
            <Label htmlFor="bountyAmount">Then create a bounty of</Label>
            <Input
              type="text"
              placeholder="Bounty amount..."
              value={bountyAmount}
              onChange={(e) => setBountyAmount(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-down-icon lucide-move-down text-zinc-600"
            >
              <path d="M8 18L12 22L16 18" />
              <path d="M12 2V22" />
            </svg>
          </div>

          {account.status === "disconnected" ? (
            <Button
              onClick={() => openConnectModal?.()}
              className="w-full cursor-pointer font-bold"
            >
              Connect Wallet to Create Bounty
            </Button>
          ) : (
            <Button type="submit" className="w-full cursor-pointer font-bold">
              Create Bounty
            </Button>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to process your payment.</AlertTitle>
              <AlertDescription>
                <p>Please verify your billing information and try again.</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Check your card details</li>
                  <li>Ensure sufficient funds</li>
                  <li>Verify billing address</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

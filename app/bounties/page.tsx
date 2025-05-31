"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type PullRequest = {
  _id: string;
  number: number;
  repo: string;
  url: string;
  author: string;
  createdAt: string;
};

type Bounty = {
  _id: string;
  repo: string;
  issue: number;
  amount: number;
  bountyOwner: string;
  createdAt: string;
  languages: { language: string; percentage: number; _id: string }[];
  coin: string;
  matchScore: number;
  pull_requests?: PullRequest[];
};

export default function BountiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [countdowns, setCountdowns] = useState<string[]>([]);
  const [rankedLanguages, setRankedLanguages] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<string>("");

  const getCountdown = (createdAt: string) => {
    const createdAtMs = new Date(createdAt).getTime();
    if (isNaN(createdAtMs)) return "Invalid date";

    const expirationTime = createdAtMs + 7 * 24 * 60 * 60 * 1000;
    const diff = expirationTime - Date.now();
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysPart = days > 0 ? `${days}d ` : "";
    return `${daysPart}${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    async function fetchBounties() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/github/bounties`
        );
        if (!response.ok) throw new Error("Failed to fetch bounties");

        const bounties = await response.json();
        console.log("Fetched bounties:", bounties);
        setBounties(bounties);
      } catch (error) {
        console.error("Error fetching bounties:", error);
      }
    }

    fetchBounties();
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      setCountdowns(bounties.map((b) => getCountdown(b.createdAt)));
    };

    if (bounties.length > 0) {
      updateCountdowns();
      const interval = setInterval(updateCountdowns, 1000);
      return () => clearInterval(interval);
    }
  }, [bounties]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/recommend-bounties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: searchQuery }),
        }
      );
      if (!response.ok) throw new Error("Failed to search bounties");

      const data = await response.json();
      setBounties(data.bounties);
      setRankedLanguages(data.ranked_languages);
      setRecommendation(data.recommendation);
    } catch (error) {
      console.error("Error searching bounties:", error);
      alert("Failed to search bounties. Please try again later.");
    }
    setSearchQuery("");
  };

  return (
    <main className="max-w-7xl w-full mx-auto p-6 space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-primary">Find Your Bounty</h1>
        <form onSubmit={handleSearch} className="space-y-2">
          <Label htmlFor="message">
            Type in the technologies you&apos;re good at and explore bounties
            that match your skills!
          </Label>
          <Textarea
            placeholder="E.g. React, Next.js, Solidity..."
            id="message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            className="mt-2 w-full cursor-pointer font-bold"
          >
            Search with AI
          </Button>
        </form>
      </section>

      {recommendation && (
        <section className="p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">AI Recommendation</h2>
          <p className="text-sm">{recommendation}</p>
          {rankedLanguages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {rankedLanguages.map((lang) => (
                <Badge key={lang} variant="default" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          )}
        </section>
      )}

      <section>
        {bounties.length === 0 ? (
          <p className="text-muted-foreground">
            No bounties found. Try searching with different keywords.
          </p>
        ) : (
          <Card className="p-0 overflow-hidden w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-3">Owner</TableHead>
                  <TableHead>Repo</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Languages</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Time Left</TableHead>
                  <TableHead>Pull Requests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bounties.map((bounty, idx) => {
                  const parts = bounty.repo.split("/");
                  const owner = parts[3];
                  const repoName = parts[4];

                  return (
                    <TableRow
                      key={bounty._id}
                      className="hover:bg-muted transition-colors"
                    >
                      <TableCell className="font-medium">{owner}</TableCell>
                      <TableCell>
                        <a
                          href={bounty.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {repoName}
                        </a>
                      </TableCell>
                      <TableCell>#{bounty.issue}</TableCell>
                      <TableCell className="flex flex-wrap gap-1">
                        {bounty.languages.map((lang) => (
                          <Badge
                            key={lang._id}
                            variant="outline"
                            className="text-xs"
                          >
                            {lang.language} ({lang.percentage}%)
                          </Badge>
                        ))}
                      </TableCell>
                      <TableCell className="text-center text-primary font-semibold">
                        {bounty.amount} {bounty.coin}
                      </TableCell>
                      <TableCell className="text-center">
                        {countdowns[idx] === "Expired" ? (
                          <Badge variant="destructive">Expired 🔥</Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="animate-pulse bg-gradient-to-r from-green-400 to-green-600 text-background font-mono tracking-tighter"
                          >
                            ⏳ {countdowns[idx]}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {bounty.pull_requests &&
                        bounty.pull_requests.length > 0 ? (
                          bounty.pull_requests.map((pr) => (
                            <div key={pr._id}>
                              <a
                                href={pr.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 underline hover:text-blue-400 transition"
                              >
                                PR #{pr.number} by {pr.author}
                              </a>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            No PRs
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>
    </main>
  );
}

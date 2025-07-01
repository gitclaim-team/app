import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const SelectPersona: React.FC = () => {
  return (
    <div className="mt-24 max-w-xl w-full mx-auto">
      <div className="mb-6 text-center">
        <h2 className="font-bold text-3xl">Create a bounty</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="w-full">
          <CardHeader className="gap-y-3 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-construction-icon lucide-construction mx-auto"
            >
              <rect x="2" y="6" width="20" height="8" rx="1" />
              <path d="M17 14v7" />
              <path d="M7 14v7" />
              <path d="M17 3v3" />
              <path d="M7 3v3" />
              <path d="M10 14 2.3 6.3" />
              <path d="m14 6 7.7 7.7" />
              <path d="m8 6 8 8" />
            </svg>
            <CardTitle>I am a Maintainer</CardTitle>
            <CardDescription>
              I will be creating bounties for my open source projects.
            </CardDescription>
            <Button asChild className="mt-5 w-full font-bold cursor-pointer">
              <Link href="/dashboard/create">Continue as Maintainer</Link>
            </Button>
          </CardHeader>
        </Card>

        <Card className="w-full">
          <CardHeader className="gap-y-3 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-code-icon lucide-code mx-auto"
            >
              <path d="m16 18 6-6-6-6" />
              <path d="m8 6-6 6 6 6" />
            </svg>
            <CardTitle>I am a Developer</CardTitle>
            <CardDescription>
              I will be browsing and claiming bounties for open source projects.
            </CardDescription>
            <Button asChild className="mt-5 w-full font-bold cursor-pointer">
              <Link href="/dashboard/bounties">Continue as Developer</Link>
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default SelectPersona;

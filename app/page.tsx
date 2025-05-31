"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Github, Wallet, Zap, Bot } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 py-12">
      <section className="max-w-7xl w-full text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          🚀 Welcome to <span className="text-primary">Cha-Ching</span>
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Effortless, automated, and secure onchain bounty payouts for your
          open-source projects.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          {session ? (
            <Button
              asChild
              variant="default"
              className="font-bold cursor-pointer"
            >
              <a href="/dashboard">Open Dashboard</a>
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => signIn("github")}
              className="font-bold cursor-pointer"
            >
              Get Started
            </Button>
          )}
          <Button
            asChild
            variant="secondary"
            className="font-bold cursor-pointer"
          >
            <a
              href="https://github.com/cha-ching-team/cha-ching"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </Button>
        </div>
      </section>

      <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-muted/50 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-primary" />
              <CardTitle>GitHub Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect your GitHub repo and automate bounties for merged PRs,
              issues, and more.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <CardTitle>Smart Contract Treasury</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Securely manage and store ETH bounties in a dedicated treasury on
              Sepolia.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <CardTitle>GitHub Bot</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Automate bounty triggers with PR merges, milestone completions, or
              reaction thresholds.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle>Dark Mode Default</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Enjoy the hacker-friendly default dark mode UI built with
              shadcn-ui.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <CardTitle>Fast & Flexible</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built with Next.js 15, Wagmi, and shadcn for instant performance
              and developer delight.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-1">
                Open Source
              </Badge>
              <CardTitle>Hackathon-Ready</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Fully open source, perfect for rapid iteration and hackathon
              domination!
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

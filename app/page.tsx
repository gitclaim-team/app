"use client";

import { BentoCard } from "@/components/bento-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Gradient } from "@/components/gradient";
import { Link } from "@/components/link";
import { Navbar } from "@/components/navbar";
import { Heading, Subheading } from "@/components/text";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { signIn, useSession } from "next-auth/react";

function Hero() {
  const { data: session } = useSession();

  return (
    <div className="relative mb-3">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/bounties"
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-fuchsia-950/30"
            >
              Browse bounties. Submit PRs. Claim crypto. No login needed.{" "}
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Where Pull Requests Print Paychecks
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Fix bugs, merge code, and collect your reward.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            {session ? (
              <Button>
                <a href="/dashboard">Offer a bounty on GitHub</a>
              </Button>
            ) : (
              <Button onClick={() => signIn("github")}>
                Sign In with GitHub
              </Button>
            )}
            <Button variant="secondary" href="/bounties">
              Claim a bounty
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="py-24">
        <Heading as="h2" className="max-w-3xl">
          Pull Requests Printing Paychecks — Live Demo
        </Heading>
        <div className="mt-6 max-w-2xl text-lg/7 font-medium text-gray-950/75">
          You don&apos;t need an account. You don&apos;t need a wallet. You
          don&apos;t even need to talk to us. Just code. We&apos;ll handle the
          rest.
        </div>
        <div className="mt-16 aspect-[1216/768] w-full sm:w-304">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-xl"
          />
        </div>
      </Container>
    </div>
  );
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Sales</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Know more about your customers than they do.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Step 1"
          title="Browse the Wall"
          description="Find a juicy bounty you want to fix. Click it — it'll take you straight to the GitHub issue. Remember, no middle-man!"
          graphic={
            <div className="h-80 bg-[url(/01.png)] bg-size-[633px_335px] bg-no-repeat" />
          }
          fade={["bottom"]}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Step 2"
          title="Fix It Like a Legend"
          description="Fork the repo. Do your magic. Submit a Pull Request like it's 2013."
          graphic={
            <div className="h-80 bg-[url(/02.png)] bg-size-[633px_339px] bg-no-repeat" />
          }
          fade={["bottom"]}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Step 4"
          title="Claim Your Bounty"
          description="Just follow the bot's simple steps. You'll get your sweet crypto directly to your wallet.
Yes, really. That's it."
          graphic={
            <div className="h-80 bg-[url(/03.png)] bg-size-[633px_335px] bg-no-repeat" />
          }
          className="lg:col-span-3 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Source"
          title="Get the furthest reach"
          description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
          graphic={
            <div className="h-80 bg-[url(/04.png)] bg-size-[633px_339px] bg-no-repeat" />
          }
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
      </div>
    </Container>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <BentoSection />
          <FeatureSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

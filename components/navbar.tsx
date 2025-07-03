/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Disclosure } from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Link } from "./link";
import { PlusGrid, PlusGridItem, PlusGridRow } from "./plus-grid";
import { Button } from "./button";
import { signIn, useSession } from "next-auth/react";

function DesktopNav() {
  const { data: session } = useSession();

  return (
    <nav className="relative hidden lg:flex items-center">
      <div className="flex flex-col gap-x-6 gap-y-4 sm:flex-row">
        {session ? (
          <Button>
            <a href="/dashboard">Offer a bounty on GitHub</a>
          </Button>
        ) : (
          <Button onClick={() => signIn("github")}>Sign In with GitHub</Button>
        )}
        <Button variant="secondary" href="/bounties">
          Claim a bounty
        </Button>
      </div>
    </nav>
  );
}

function MobileNavButton() {
  return (
    <Button
      className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </Button>
  );
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <img src="/logo.svg" className="h-24" />
              </Link>
            </PlusGridItem>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
    </Disclosure>
  );
}

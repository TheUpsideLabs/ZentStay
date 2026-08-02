import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-18 items-center justify-between">

          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/">Home</Link>

            <Link href="/properties">
              Properties
            </Link>

            <Link href="/colleges">
              Colleges
            </Link>

            <Link href="/owners">
              For Owners
            </Link>

            <Link href="/about">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">

            <Button variant="ghost">
              Login
            </Button>

            <Button>
              Get Started
            </Button>

          </div>

        </div>
      </Container>
    </header>
  );
}
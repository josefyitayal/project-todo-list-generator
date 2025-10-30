import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-between h-14 px-5 py-2 border-b border-border">
        <h1 className="text-2xl font-bold">LOGO</h1>

        <div className="flex items-center gap-4">
          <SignedOut>
            <Button asChild size="sm">
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MagicLinkPage() {
  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className="text-center">Expired Token</h1>
      <p className="text-xl">
        Sorry, this token was either expired or already used. Please try logging
        in again
      </p>

      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}

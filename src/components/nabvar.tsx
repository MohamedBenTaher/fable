import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <div className=" sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-md transition-all ">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-2xl text-gray-900">Fable.</span>
          </Link>
          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              className={buttonVariants({ size: "sm", variant: "ghost" })}
              href="/dashboard"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              className={buttonVariants({ size: "sm", variant: "ghost" })}
              href="/sign-in"
            >
              Sign in
            </Link>
            <Link className={buttonVariants({ size: "sm" })} href="/sign-up">
              Sign up
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Navbar;

"use client";

import { SignIn } from "@clerk/nextjs";

export default function AuthSection() {
  return (
    <div className="flex-1 h-full flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <SignIn routing="hash" />
      </div>
    </div>
  );
}

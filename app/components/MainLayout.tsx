"use client";

import { useFiles } from "../context/FileContext";
import FileUpload from "./FileUpload";
import AuthSection from "./AuthSection";
import ToggleButton from "./ToggleButton";

interface MainLayoutProps {
  isSignedIn: boolean;
}

export default function MainLayout({ isSignedIn }: MainLayoutProps) {
  const { showAuth } = useFiles();

  return (
    <main className="flex min-h-screen overflow-x-hidden">
      {/* Left side - File Upload */}
      <div className={`p-8 ${!isSignedIn && showAuth ? "flex-1" : "w-full"}`}>
        <h1 className="text-2xl font-bold mb-6">Convert Files to DataURI</h1>
        <FileUpload />
      </div>

      {/* Right side - Auth (only shown if not signed in) */}
      <div className={`relative ${showAuth ? "flex-1" : "w-0"}`}>
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 -translate-x-1/2 z-10">
          <ToggleButton />
        </div>
        <AuthSection />
      </div>
    </main>
  );
}

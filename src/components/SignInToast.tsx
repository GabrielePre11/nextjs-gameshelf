"use client";

import React, { useEffect } from "react";
import { SignUpButton } from "@clerk/nextjs";

export default function SignInToast({
  showSignInToast,
  setShowSignInToast,
}: {
  showSignInToast: boolean;
  setShowSignInToast: (value: boolean) => void;
}) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      // Automatically hide the toast after 3.5 seconds
      setShowSignInToast(false);
    }, 3500);

    return () => clearTimeout(timeOut);
  }, [showSignInToast]);

  return (
    <div
      className={`fixed flex flex-col sm:flex-row items-center gap-2 bottom-2 truncate z-50 py-1 px-2 bg-bg-secondary border-2 border-border rounded-lg text-[0.910rem] sm:text-[1rem] transform transition-all duration-300 ease-in-out left-1/2 -translate-x-1/2 ${
        showSignInToast ? "translate-y-0" : "translate-y-96"
      }`}
      aria-live="polite"
      role="alert"
      aria-label="Sign In Toast"
    >
      <p>You must be signed in to perform this action.</p>

      {/*=========== Sign Up Button ===========*/}
      <div
        className="flex items-center justify-center gap-2 w-full sm:w-max px-5 py-2 bg-bg border border-border rounded-lg sm:rounded-full transition-colors duration-300 hover:bg-bg/50"
        aria-label="Sign Up"
      >
        <SignUpButton mode="modal" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-log-in-icon lucide-log-in"
        >
          <path d="m10 17 5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        </svg>
      </div>
    </div>
  );
}

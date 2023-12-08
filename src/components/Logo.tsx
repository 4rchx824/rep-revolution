import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="text-center text-3xl font-semibold tracking-tighter pb-2"
    >
      <span>rep</span>
      <span className="text-red-600">revolution</span>
    </Link>
  );
}

export default Logo;
import type { ReactNode } from "react";
import Navbar from "@/components/CustomNavbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[100dvh]">{children}</main>
    </>
  );
}

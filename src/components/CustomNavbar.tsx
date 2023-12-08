import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

import Link from "next/link";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/react";
import { LogOut, User2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

function CustomNavbar() {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: { label: string; href?: string }[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: !session ? "Login" : "Logout",
      href: !session ? "/auth/signin" : undefined,
    },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {!session ? (
            <Link href="/auth/signin">Login</Link>
          ) : (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  showFallback
                  name={session.user.name?.charAt(0) ?? ""}
                  src={session.user.image ?? ""}
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu>
              <DropdownItem>
                  <div className="flex h-4 items-center justify-between">
                    <h1>Profile</h1>
                    <User2 className="h-full" />
                  </div>
                </DropdownItem>
                <DropdownItem onClick={() => void signOut()}>
                  <div className="flex h-4 items-center justify-between">
                    <h1>Logout</h1>
                    <LogOut className="h-full" />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item.label}-${index}`}
            isActive={pathname === item.href}
          >
            <Link
              className={cn(
                "w-full",
                item.label === "Logout" && "text-red-600",
              )}
              href={item.href ?? ""}
              onClick={() => {
                if (item.label === "Logout") void signOut();

                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default CustomNavbar;

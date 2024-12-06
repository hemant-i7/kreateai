"use client";
import Logo from "@/components/Logo";
import MobileNavLinks from "@/components/MobileNavLinks";
import { buttonVariants } from "@/components/ui/button";
import { NavbarConfig } from "@/utils/AppConfig";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="sticky top-4 z-40 mx-auto w-screen overflow-hidden">
      <div className="mx-4 my-1 flex h-14 items-center justify-between rounded-full border-primary bg-accent/30 px-3 ring-1 ring-muted-foreground backdrop-blur-md md:mx-10 xl:mx-auto xl:max-w-screen-lg">
        <Link href={"/"} className="basis-1/3">
          <Logo width={30} height={40} />
        </Link>
        <div className="hidden items-center justify-center md:flex">
          {session ? (
            <>
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "text-md hover:bg-transparent",
                  })}
                >
                 Dashboard
                </motion.div>
              </Link>
            </>
          ) : (
            <></>
          )}
          {NavbarConfig.unauth.map((link, index) => {
            return (
              <Link key={index} href={link.href} className="font-medium">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "text-md hover:bg-transparent",
                  })}
                >
                  {link.label}
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="items-cemter hidden basis-1/3 justify-end md:flex">
          {session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full">
                  <Avatar>
                    <AvatarImage src={session?.user?.image as string} />

                    <AvatarFallback className="ring-2 ring-primary">
                      {session?.user?.name?.charAt(0) as string}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10} align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {NavbarConfig.buttons.map((button, index) => (
                <Link key={index} href={button.href} className="">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.99 }}
                    className={buttonVariants({
                      variant: "default",
                      size: "lg",
                      className: "text-md w-full rounded-3xl p-3",
                    })}
                  >
                    {button.label}
                  </motion.div>
                </Link>
              ))}
            </>
          )}
        </div>
        <MobileNavLinks session={session} />
      </div>
    </nav>
  );
}

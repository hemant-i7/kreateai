import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import { MenuIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { NavbarConfig } from "@/utils/AppConfig";
import Link from "next/link";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export default function MobileNavLinks({
  session,
}: {
  session: Session | null;
}) {
  return (
    <Drawer>
      <DrawerTrigger className="block md:hidden">
        <MenuIcon size={24} />
      </DrawerTrigger>
      <DrawerContent className="my-2 flex w-full flex-col items-center justify-center gap-2">
        <DrawerTitle />
        <DrawerDescription />
        {session ? (
          <>
            <Link href="/dashboard" className="mx-2 w-11/12">
              <div
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: "w-full p-3 text-lg hover:bg-accent",
                })}
              >
                Dashboard
              </div>
            </Link>
          </>
        ) : (
          <></>
        )}
        {NavbarConfig.unauth.map((link, index) => {
          return (
            <Link key={index} href={link.href} className="mx-2 w-11/12">
              <div
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: "w-full p-3 text-lg hover:bg-accent",
                })}
              >
                {link.label}
              </div>
            </Link>
          );
        })}
        {session ? (
          <>
            <div className="mx-2 w-11/12">
              <div
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "w-full p-3 text-lg",
                })}
              >
                Sign out
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="mx-auto w-11/12">
          <Separator className="bg-border" />
        </div>

        {session ? (
          <>
            <div className="my-2 flex w-full items-start justify-start gap-4 px-5">
              <Avatar>
                <AvatarImage src={session?.user?.image as string} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-start text-pretty">
                <p className="font-medium">{session.user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {NavbarConfig.buttons.map((button, index) => (
              <Link key={index} href={button.href} className="mx-2 w-11/12">
                <div
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                    className: "w-full p-3 text-lg",
                  })}
                >
                  {button.label}
                </div>
              </Link>
            ))}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

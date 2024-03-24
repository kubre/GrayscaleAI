"use client"

import * as React from "react"

import { cn } from "~/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "~/components/ui/navigation-menu"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { Session } from "next-auth"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

function getInitials(name: string) {
    const [firstName, lastName] = name.split(" ");
    // check if typeof string
    if (typeof firstName === "string" && typeof lastName === "string") {
        return firstName.charAt(0) + lastName.charAt(0);
    }
    return name[0];
}

export function DashboardProfileNavigation({ user }: { user: Session["user"] }) {

    return (
        <NavigationMenu className="ml-auto">
            <NavigationMenuList className="gap-x-4">
                <NavigationMenuItem>
                    <Button variant="ghost" onClick={() => signOut}>
                        Sign out
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Avatar>
                        <AvatarImage className="h-10 w-10 rounded-full" src={user.image ?? ""} />
                        <AvatarFallback>{getInitials(user.name ?? "U")}</AvatarFallback>
                    </Avatar>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


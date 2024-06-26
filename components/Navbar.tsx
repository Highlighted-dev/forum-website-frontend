import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { SignIn } from "./SignIn";
import { Session } from "next-auth";
import { MenuIcon } from "lucide-react";
import ProfileDropdown from "./profile/ProfileDropdown";
import Image from "next/image";

export default function NavBar({ session }: { session: Session | null }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/discussions", label: "Discussions" },
    { href: "/servers", label: "Servers" },
  ];
  const mobileLinks = [
    { href: "/tos", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ];
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden p-1">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" prefetch={false}>
            <Image
              src="/strefagier.svg"
              alt="StrefaGier"
              width={48}
              height={48}
            />
            <span className="sr-only">StrefaGier</span>
          </Link>
          <div className="grid gap-2 py-6">
            {links.map((link) => (
              <Link
                href={link.href}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
            {mobileLinks.map((link) => (
              <Link
                href={link.href}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <Image src="/strefagier.svg" alt="StrefaGier" height={56} width={56} />
        <span className="sr-only">StrefaGier</span>
      </Link>
      <div className="flex w-full justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuLink asChild key={link.label}>
                <Link
                  href={link.href}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90"
                  prefetch={false}
                >
                  {link.label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto">
        {session ? <ProfileDropdown session={session} /> : <SignIn />}
      </div>
    </header>
  );
}

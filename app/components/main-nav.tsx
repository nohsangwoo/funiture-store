"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, User, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function MainNav() {
  const pathname = usePathname()

  const isAdmin = pathname.startsWith("/admin")

  const routes = [
    {
      href: "/products/living-room",
      label: "Living Room",
      active: pathname === "/products/living-room",
    },
    {
      href: "/products/bedroom",
      label: "Bedroom",
      active: pathname === "/products/bedroom",
    },
    {
      href: "/products/kitchen",
      label: "Kitchen",
      active: pathname === "/products/kitchen",
    },
    {
      href: "/products/office",
      label: "Office",
      active: pathname === "/products/office",
    },
    {
      href: "/products/outdoor",
      label: "Outdoor",
      active: pathname === "/products/outdoor",
    },
    {
      href: "/admin",
      label: "Admin",
      active: pathname.startsWith("/admin"),
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold">FurniCraft</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {routes.map((route) =>
            route.href !== "/admin" || !isAdmin ? (
              <Link
                key={route.href}
                href={route.href}
                className={`font-medium ${route.active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {route.label}
              </Link>
            ) : null,
          )}
        </div>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex items-center relative">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-64 pl-8" />
          </form>
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="md:hidden">
            <span className="sr-only">Menu</span>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}


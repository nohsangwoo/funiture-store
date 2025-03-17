"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Package, Users, Settings, Menu, Bell, Search, ShoppingCart, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === "/admin",
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: <Package className="h-5 w-5" />,
      active: pathname === "/admin/products",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/admin/users",
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-4 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <div className="flex h-16 items-center border-b px-4">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 font-semibold"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
                  <span>FurniCraft Admin</span>
                </Link>
              </div>
              <nav className="grid gap-1 p-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${
                      route.active ? "bg-muted" : ""
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {route.icon}
                    {route.label}
                  </Link>
                ))}
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted mt-6"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Back to Store
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/admin" className="hidden items-center gap-2 font-semibold lg:flex">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span>FurniCraft Admin</span>
          </Link>
          <div className="flex-1 flex items-center justify-end gap-4">
            <form className="hidden md:flex items-center relative">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-64 pl-8" />
            </form>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Admin User" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="hidden w-[240px] flex-col border-r bg-muted/40 lg:flex">
          <nav className="grid gap-1 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${
                  route.active ? "bg-muted" : ""
                }`}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted mt-6"
            >
              <ShoppingCart className="h-5 w-5" />
              Back to Store
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}


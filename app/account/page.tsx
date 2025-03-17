"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Package, User, Heart, MapPin, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "January 2023",
    points: 250,
  }

  // Mock order data
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-11-15",
      status: "Delivered",
      total: 1799.97,
      items: [
        { name: "Modern Sofa", price: 1299, quantity: 1 },
        { name: "Coffee Table", price: 499, quantity: 1 },
      ],
    },
    {
      id: "ORD-12346",
      date: "2023-10-22",
      status: "Delivered",
      total: 349.99,
      items: [
        { name: "Floor Lamp", price: 179.99, quantity: 1 },
        { name: "Decorative Pillows", price: 89, quantity: 2 },
      ],
    },
    {
      id: "ORD-12347",
      date: "2023-12-05",
      status: "Processing",
      total: 899,
      items: [{ name: "Dining Table", price: 899, quantity: 1 }],
    },
  ]

  // Mock wishlist data
  const wishlist = [
    {
      id: 1,
      name: "Leather Recliner",
      price: 799,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Bookshelf",
      price: 349,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Desk Lamp",
      price: 129,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Mock address data
  const addresses = [
    {
      id: 1,
      type: "Home",
      default: true,
      name: "Sarah Johnson",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      type: "Work",
      default: false,
      name: "Sarah Johnson",
      street: "456 Market Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
      phone: "+1 (555) 987-6543",
    },
  ]

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">My Account</span>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <Card className="h-fit">
          <CardHeader className="flex flex-row items-center gap-4 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <nav className="grid">
              <button
                className={`flex items-center gap-2 p-4 text-sm hover:bg-muted ${activeTab === "profile" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                className={`flex items-center gap-2 p-4 text-sm hover:bg-muted ${activeTab === "orders" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <Package className="h-4 w-4" />
                Orders
              </button>
              <button
                className={`flex items-center gap-2 p-4 text-sm hover:bg-muted ${activeTab === "wishlist" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </button>
              <button
                className={`flex items-center gap-2 p-4 text-sm hover:bg-muted ${activeTab === "addresses" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="h-4 w-4" />
                Addresses
              </button>
              <button
                className={`flex items-center gap-2 p-4 text-sm hover:bg-muted ${activeTab === "settings" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </button>
              <Link href="/auth/login" className="flex items-center gap-2 p-4 text-sm hover:bg-muted text-destructive">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Link>
            </nav>
          </CardContent>
        </Card>

        <div>
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{user.points} Points</Badge>
                      <Badge variant="outline">Silver Member</Badge>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={user.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value="••••••••" readOnly />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                    <Link href="/products">
                      <Button className="mt-4">Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{order.id}</h3>
                                <Badge variant={order.status === "Delivered" ? "outline" : "default"}>
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Ordered on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.length} {order.items.length === 1 ? "item" : "items"}
                              </p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span>
                                  {item.name} × {item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "wishlist" && (
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlist.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Your wishlist is empty.</p>
                    <Link href="/products">
                      <Button className="mt-4">Explore Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {wishlist.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="aspect-square object-cover w-full"
                        />
                        <CardContent className="p-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-bold mt-1">${item.price}</p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="flex-1">
                              Add to Cart
                            </Button>
                            <Button size="sm" variant="outline">
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "addresses" && (
            <Card>
              <CardHeader>
                <CardTitle>Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-end">
                  <Button>Add New Address</Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{address.type}</h3>
                            {address.default && <Badge variant="outline">Default</Badge>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p>{address.name}</p>
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p>{address.country}</p>
                          <p className="mt-2">{address.phone}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing" className="flex-1">
                        Marketing emails
                      </Label>
                      <input
                        type="checkbox"
                        id="marketing"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="orders" className="flex-1">
                        Order updates
                      </Label>
                      <input type="checkbox" id="orders" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="promotions" className="flex-1">
                        Promotions and sales
                      </Label>
                      <input
                        type="checkbox"
                        id="promotions"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium">Privacy Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-sharing" className="flex-1">
                        Data sharing with partners
                      </Label>
                      <input type="checkbox" id="data-sharing" className="h-4 w-4 rounded border-gray-300" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="personalization" className="flex-1">
                        Personalized recommendations
                      </Label>
                      <input
                        type="checkbox"
                        id="personalization"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium">Account Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline" className="text-destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


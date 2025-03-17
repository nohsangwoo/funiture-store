"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your store settings and preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="w-full justify-start border-b pb-0">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="FurniCraft" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-url">Store URL</Label>
                  <Input id="store-url" defaultValue="https://furnicraft.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea
                  id="store-description"
                  defaultValue="Premium furniture and interior decor for your dream space."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="info@furnicraft.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Textarea
                  id="store-address"
                  defaultValue="123 Furniture Lane, Design District, San Francisco, CA 94103, United States"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your store for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" defaultValue="FurniCraft - Premium Furniture & Interior Decor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Discover premium furniture and interior decor at FurniCraft. Shop our collection of modern, classic, and contemporary pieces for your dream space."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input id="meta-keywords" defaultValue="furniture, interior, decor, modern, classic, contemporary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your store to social media platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" defaultValue="https://facebook.com/furnicraft" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" defaultValue="https://instagram.com/furnicraft" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" defaultValue="https://twitter.com/furnicraft" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinterest">Pinterest</Label>
                  <Input id="pinterest" defaultValue="https://pinterest.com/furnicraft" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the look and feel of your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input id="primary-color" type="color" defaultValue="#000000" className="w-12 h-10 p-1" />
                  <Input defaultValue="#000000" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <Input id="accent-color" type="color" defaultValue="#4f46e5" className="w-12 h-10 p-1" />
                  <Input defaultValue="#4f46e5" className="flex-1" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Homepage Layout</CardTitle>
              <CardDescription>Configure the layout of your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-section">Hero Section</Label>
                <Select defaultValue="image-left">
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image-left">Image Left</SelectItem>
                    <SelectItem value="image-right">Image Right</SelectItem>
                    <SelectItem value="full-width">Full Width</SelectItem>
                    <SelectItem value="slider">Slider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured-products">Featured Products</Label>
                <Select defaultValue="grid">
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-categories">Show Categories</Label>
                <Switch id="show-categories" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-testimonials">Show Testimonials</Label>
                <Switch id="show-testimonials" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Methods</CardTitle>
              <CardDescription>Configure shipping options for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">Offer free shipping on all orders</p>
                </div>
                <Switch id="free-shipping" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Flat Rate Shipping</h3>
                  <p className="text-sm text-muted-foreground">Charge a fixed rate for shipping</p>
                </div>
                <Switch id="flat-rate" defaultChecked />
              </div>
              <div className="pl-6 space-y-2">
                <Label htmlFor="flat-rate-amount">Flat Rate Amount</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <Input id="flat-rate-amount" type="number" defaultValue="10" className="w-24" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Local Pickup</h3>
                  <p className="text-sm text-muted-foreground">Allow customers to pick up orders in-store</p>
                </div>
                <Switch id="local-pickup" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">International Shipping</h3>
                  <p className="text-sm text-muted-foreground">Ship orders internationally</p>
                </div>
                <Switch id="international-shipping" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Zones</CardTitle>
              <CardDescription>Define shipping rates for different regions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">United States</h3>
                    <p className="text-sm text-muted-foreground">All states</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">Canada</h3>
                    <p className="text-sm text-muted-foreground">All provinces</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">Europe</h3>
                    <p className="text-sm text-muted-foreground">EU countries</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <Button variant="outline">Add Shipping Zone</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure payment options for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Credit Card</h3>
                  <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                </div>
                <Switch id="credit-card" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">PayPal</h3>
                  <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                </div>
                <Switch id="paypal" defaultChecked />
              </div>
              <div className="pl-6 space-y-2">
                <Label htmlFor="paypal-email">PayPal Email</Label>
                <Input id="paypal-email" type="email" defaultValue="payments@furnicraft.com" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Apple Pay</h3>
                  <p className="text-sm text-muted-foreground">Accept Apple Pay payments</p>
                </div>
                <Switch id="apple-pay" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Google Pay</h3>
                  <p className="text-sm text-muted-foreground">Accept Google Pay payments</p>
                </div>
                <Switch id="google-pay" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground">Accept direct bank transfers</p>
                </div>
                <Switch id="bank-transfer" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency Settings</CardTitle>
              <CardDescription>Configure currency options for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                    <SelectItem value="aud">AUD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="currency-symbol-position">Currency Symbol Position</Label>
                <Select defaultValue="before">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Before ($100)</SelectItem>
                    <SelectItem value="after">After (100$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="multi-currency">Enable Multi-Currency</Label>
                <Switch id="multi-currency" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notifications for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Order</h3>
                  <p className="text-sm text-muted-foreground">Send email when a new order is placed</p>
                </div>
                <Switch id="new-order-email" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Order Status Update</h3>
                  <p className="text-sm text-muted-foreground">Send email when an order status changes</p>
                </div>
                <Switch id="order-status-email" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Abandoned Cart</h3>
                  <p className="text-sm text-muted-foreground">Send email for abandoned carts</p>
                </div>
                <Switch id="abandoned-cart-email" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Customer Registration</h3>
                  <p className="text-sm text-muted-foreground">Send email when a new customer registers</p>
                </div>
                <Switch id="registration-email" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Product Review</h3>
                  <p className="text-sm text-muted-foreground">Send email when a product receives a review</p>
                </div>
                <Switch id="review-email" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Notifications</CardTitle>
              <CardDescription>Configure notifications for administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Low Stock Alert</h3>
                  <p className="text-sm text-muted-foreground">Notify when product stock is low</p>
                </div>
                <Switch id="low-stock-alert" defaultChecked />
              </div>
              <div className="pl-6 space-y-2">
                <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                <Input id="low-stock-threshold" type="number" defaultValue="5" className="w-24" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Order Alert</h3>
                  <p className="text-sm text-muted-foreground">Notify when a new order is placed</p>
                </div>
                <Switch id="new-order-alert" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Customer Support Request</h3>
                  <p className="text-sm text-muted-foreground">Notify when a customer submits a support request</p>
                </div>
                <Switch id="support-request-alert" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Advanced configuration options for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Maintenance Mode</h3>
                  <p className="text-sm text-muted-foreground">Put your store in maintenance mode</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Debug Mode</h3>
                  <p className="text-sm text-muted-foreground">Enable debug mode for troubleshooting</p>
                </div>
                <Switch id="debug-mode" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Cache</h3>
                  <p className="text-sm text-muted-foreground">Enable caching for better performance</p>
                </div>
                <Switch id="cache" defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" defaultValue="sk_live_51NXxXXXXXXXXXXXXXXXXXXXX" type="password" />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup & Export</CardTitle>
              <CardDescription>Backup and export your store data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Database Backup</h3>
                <p className="text-sm text-muted-foreground">Create a backup of your store database</p>
                <Button variant="outline">Create Backup</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Export Products</h3>
                <p className="text-sm text-muted-foreground">Export your products to CSV</p>
                <Button variant="outline">Export Products</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Export Orders</h3>
                <p className="text-sm text-muted-foreground">Export your orders to CSV</p>
                <Button variant="outline">Export Orders</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Export Customers</h3>
                <p className="text-sm text-muted-foreground">Export your customers to CSV</p>
                <Button variant="outline">Export Customers</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Save className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}


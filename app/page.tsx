import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainNav from "@/components/main-nav"
import { categories, getFeaturedProducts, getNewArrivals, getBestsellers } from "@/lib/mock-data"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const bestsellers = getBestsellers()
  const newArrivals = getNewArrivals()

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Space with Style
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover premium furniture and interior decor that reflects your unique taste and lifestyle.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button size="lg">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/inspiration">
                    <Button variant="outline" size="lg">
                      Get Inspired
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/products/converted-image-23.webp"
                alt="Modern living room setup"
                width={550}
                height={550}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Space</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find the perfect pieces for every room in your home
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
              {categories.map((category) => (
                <Link href={`/products?category=${category.id}`} key={category.id}>
                  <Card className="overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="aspect-square object-cover transition-all hover:scale-105"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-medium text-center">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular and trending furniture pieces
                </p>
              </div>
            </div>
            <Tabs defaultValue="trending" className="mt-8">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
                  <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="trending" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredProducts.slice(0, 4).map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                      <Card className="overflow-hidden h-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="aspect-square object-cover w-full"
                        />
                        <CardContent className="p-4">
                          <Badge className="mb-2">{product.category}</Badge>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-muted-foreground">${product.price}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="bestsellers" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {bestsellers.slice(0, 4).map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                      <Card className="overflow-hidden h-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="aspect-square object-cover w-full"
                        />
                        <CardContent className="p-4">
                          <Badge className="mb-2">{product.category}</Badge>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-muted-foreground">${product.price}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="new-arrivals" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {newArrivals.slice(0, 4).map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                      <Card className="overflow-hidden h-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="aspect-square object-cover w-full"
                        />
                        <CardContent className="p-4">
                          <Badge className="mb-2">{product.category}</Badge>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-muted-foreground">${product.price}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-center mt-8">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Interior design inspiration"
                width={550}
                height={550}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get Inspired</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Explore our curated collections and interior design tips to create your dream space.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Expert Tips</h3>
                    <p className="text-muted-foreground">
                      Get professional advice on how to style your home from our interior design experts.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Customer Showcases</h3>
                    <p className="text-muted-foreground">
                      See how our customers have transformed their spaces with our furniture.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Style Guides</h3>
                    <p className="text-muted-foreground">
                      Discover different interior styles and find the one that matches your personality.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">DIY Projects</h3>
                    <p className="text-muted-foreground">
                      Learn how to personalize and upgrade your furniture with simple DIY techniques.
                    </p>
                  </div>
                </div>
                <div>
                  <Link href="/inspiration">
                    <Button>
                      Explore Inspiration Gallery
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold">FurniCraft</span>
            </Link>
            <p className="text-sm text-muted-foreground">Premium furniture and interior decor for your dream space.</p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Shop</h3>
            <nav className="grid gap-2 text-sm">
              {categories.slice(0, 5).map((category) => (
                <Link key={category.id} href={`/products?category=${category.id}`} className="hover:underline">
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Company</h3>
            <nav className="grid gap-2 text-sm">
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
              <Link href="/careers" className="hover:underline">
                Careers
              </Link>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <Link href="/press" className="hover:underline">
                Press
              </Link>
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Legal</h3>
            <nav className="grid gap-2 text-sm">
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/shipping" className="hover:underline">
                Shipping Policy
              </Link>
              <Link href="/returns" className="hover:underline">
                Return Policy
              </Link>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t">
          <div className="container flex flex-col gap-2 px-4 py-6 md:px-6 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} FurniCraft. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


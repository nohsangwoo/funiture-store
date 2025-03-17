"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import MainNav from "@/components/main-nav"
import { getProductById, getRelatedProducts } from "@/lib/mock-data"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(Number(params.id))
  const relatedProducts = getRelatedProducts(Number.parseInt(params.id + ""), 4)

  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "")
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div>
        <MainNav />
        <div className="container px-4 py-8 md:px-6 md:py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div>
      <MainNav />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/products?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="aspect-square object-cover"
              />
            </div>
            <div className="flex gap-4 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative overflow-hidden rounded-lg border ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    width={100}
                    height={100}
                    className="aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>{product.category}</Badge>
                <Badge variant="outline">{product.style}</Badge>
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : i < product.rating
                            ? "fill-primary text-primary opacity-50"
                            : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.discount && (
                  <span className="text-lg text-muted-foreground line-through">${product.discount}</span>
                )}
                {product.discount && (
                  <Badge variant="destructive" className="ml-2">
                    Save ${product.discount - product.price}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Price includes taxes. Shipping calculated at checkout.</p>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Color</span>
                  <span className="text-sm text-muted-foreground">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full border ${
                        selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                  <span className="ml-4 text-sm text-muted-foreground">{product.stock} available</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Free Shipping</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Estimated delivery: 5-7 business days</p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h2 className="font-medium">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
              <h3 className="font-medium">Key Features</h3>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">About this item</h3>
              <p className="text-muted-foreground">
                The {product.name} is designed to provide both comfort and style to your living space. Its clean lines
                and
                {product.style.toLowerCase()} design make it a versatile piece that can complement various interior
                styles. The
                {product.material.toLowerCase()} material ensures durability and stability, while the{" "}
                {product.color.toLowerCase()} color option allows it to blend seamlessly with your existing decor.
              </p>
              <p className="text-muted-foreground">
                This product is perfect for small to medium-sized spaces, apartments, or office areas. Its neutral color
                options allow it to blend seamlessly with your existing decor, while its modern design adds a touch of
                sophistication to any space.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="rounded-lg border p-4">
                    <h4 className="font-medium capitalize">{key}</h4>
                    <p className="mt-1 text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2 rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">Great purchase!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This {product.name} exceeded my expectations. It's comfortable, stylish, and the quality is
                      excellent for the price. Assembly was straightforward and took about 30 minutes.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">John D. - 2 months ago</span>
                      <Button variant="ghost" size="sm">
                        Helpful
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Shipping Information</h3>
              <p className="text-muted-foreground">
                We offer free standard shipping on all orders. Standard shipping takes 5-7 business days. For an
                additional fee, you can choose expedited shipping (2-3 business days) or premium shipping (1-2 business
                days).
              </p>
              <h3 className="text-lg font-medium">Return Policy</h3>
              <p className="text-muted-foreground">
                We accept returns within 30 days of delivery. The item must be in its original condition and packaging.
                Return shipping costs are the responsibility of the customer unless the return is due to our error or a
                defective product.
              </p>
              <h3 className="text-lg font-medium">Warranty</h3>
              <p className="text-muted-foreground">
                This product comes with a {product.specifications.warranty} that covers manufacturing defects. The
                warranty does not cover damage due to misuse, improper care, or normal wear and tear.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <Link href="/products" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                <Card className="overflow-hidden h-full">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="aspect-square object-cover w-full"
                  />
                  <CardContent className="p-4">
                    <Badge className="mb-2">{relatedProduct.category}</Badge>
                    <h3 className="font-medium">{relatedProduct.name}</h3>
                    <p className="font-bold mt-1">${relatedProduct.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


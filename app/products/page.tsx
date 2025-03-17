"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, Grid3X3, List, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import MainNav from "@/components/main-nav"
import { products, categories } from "@/lib/mock-data"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  // Get unique values for filters
  const styles = Array.from(new Set(products.map((product) => product.style)))
  const materials = Array.from(new Set(products.map((product) => product.material)))
  const colors = Array.from(new Set(products.map((product) => product.color)))

  // Filter products based on selected filters
  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory) {
      const category = categories.find((c) => c.id === selectedCategory)?.name
      if (category) {
        result = result.filter((product) => product.category === category)
      }
    }

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by styles
    if (selectedStyles.length > 0) {
      result = result.filter((product) => selectedStyles.includes(product.style))
    }

    // Filter by materials
    if (selectedMaterials.length > 0) {
      result = result.filter((product) => selectedMaterials.includes(product.material))
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter((product) => selectedColors.includes(product.color))
    }

    setFilteredProducts(result)
  }, [selectedCategory, priceRange, selectedStyles, selectedMaterials, selectedColors])

  // Update selected category when URL parameter changes
  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  // Toggle style selection
  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  // Toggle material selection
  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null)
    setPriceRange([0, 5000])
    setSelectedStyles([])
    setSelectedMaterials([])
    setSelectedColors([])
  }

  return (
    <div>
      <MainNav />
      <div className="container px-4 py-8 md:px-6 md:py-12 items-center">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name : "All Products"}
            </h1>
            <p className="text-muted-foreground">
              Browse our collection of premium furniture
              {selectedCategory && ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your product search with filters</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center gap-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategory === category.id}
                            onCheckedChange={() =>
                              setSelectedCategory(selectedCategory === category.id ? null : category.id)
                            }
                          />
                          <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 5000]}
                        max={5000}
                        step={100}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value)}
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-sm">${priceRange[0]}</p>
                        <p className="text-sm">${priceRange[1]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Style</h3>
                    <div className="space-y-2">
                      {styles.map((style) => (
                        <div key={style} className="flex items-center gap-2">
                          <Checkbox
                            id={`style-${style}`}
                            checked={selectedStyles.includes(style)}
                            onCheckedChange={() => toggleStyle(style)}
                          />
                          <Label htmlFor={`style-${style}`}>{style}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Material</h3>
                    <div className="space-y-2">
                      {materials.map((material) => (
                        <div key={material} className="flex items-center gap-2">
                          <Checkbox
                            id={`material-${material}`}
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={() => toggleMaterial(material)}
                          />
                          <Label htmlFor={`material-${material}`}>{material}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Color</h3>
                    <div className="space-y-2">
                      {colors.map((color) => (
                        <div key={color} className="flex items-center gap-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => toggleColor(color)}
                          />
                          <Label htmlFor={`color-${color}`}>{color}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Apply Filters</Button>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] mt-8">
          <div className="hidden md:block space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..." className="pl-8" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Categories</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`desktop-category-${category.id}`}
                      checked={selectedCategory === category.id}
                      onCheckedChange={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    />
                    <Label htmlFor={`desktop-category-${category.id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Price Range</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 5000]}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm">${priceRange[0]}</p>
                  <p className="text-sm">${priceRange[1]}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Style</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {styles.map((style) => (
                  <div key={style} className="flex items-center gap-2">
                    <Checkbox
                      id={`desktop-style-${style}`}
                      checked={selectedStyles.includes(style)}
                      onCheckedChange={() => toggleStyle(style)}
                    />
                    <Label htmlFor={`desktop-style-${style}`}>{style}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Material</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {materials.map((material) => (
                  <div key={material} className="flex items-center gap-2">
                    <Checkbox
                      id={`desktop-material-${material}`}
                      checked={selectedMaterials.includes(material)}
                      onCheckedChange={() => toggleMaterial(material)}
                    />
                    <Label htmlFor={`desktop-material-${material}`}>{material}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Color</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {colors.map((color) => (
                  <div key={color} className="flex items-center gap-2">
                    <Checkbox
                      id={`desktop-color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => toggleColor(color)}
                    />
                    <Label htmlFor={`desktop-color-${color}`}>{color}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-xl font-semibold mb-2">No products found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-bold">${product.price}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>★</span>
                            <span>{product.rating}</span>
                            <span className="ml-1">({product.reviews})</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="aspect-square object-cover sm:w-48"
                        />
                        <CardContent className="p-4 flex-1">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <Badge className="mb-2">{product.category}</Badge>
                              <h3 className="font-medium text-lg">{product.name}</h3>
                              <p className="text-muted-foreground mt-2">
                                Style: {product.style} | Material: {product.material} | Color: {product.color}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <p className="font-bold text-lg">${product.price}</p>
                              <div className="flex items-center text-sm">
                                <span>★</span>
                                <span>{product.rating}</span>
                                <span className="ml-1">({product.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
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
                      className="h-4 w-4"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span className="sr-only">Previous page</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
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
                      className="h-4 w-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <span className="sr-only">Next page</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


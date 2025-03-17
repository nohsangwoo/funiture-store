"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Download, Edit, Filter, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  // Mock product data
  const products = [
    {
      id: "PROD-1234",
      name: "Modern Sofa",
      category: "Living Room",
      price: 1299,
      stock: 15,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1235",
      name: "Coffee Table",
      category: "Living Room",
      price: 499,
      stock: 23,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1236",
      name: "Dining Table",
      category: "Dining Room",
      price: 899,
      stock: 8,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1237",
      name: "Office Desk",
      category: "Office",
      price: 699,
      stock: 12,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1238",
      name: "Bookshelf",
      category: "Living Room",
      price: 349,
      stock: 18,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1239",
      name: "Bed Frame",
      category: "Bedroom",
      price: 899,
      stock: 5,
      status: "Low Stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1240",
      name: "Nightstand",
      category: "Bedroom",
      price: 249,
      stock: 0,
      status: "Out of Stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1241",
      name: "Floor Lamp",
      category: "Lighting",
      price: 179,
      stock: 25,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1242",
      name: "Desk Chair",
      category: "Office",
      price: 299,
      stock: 14,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "PROD-1243",
      name: "Dresser",
      category: "Bedroom",
      price: 599,
      stock: 7,
      status: "Active",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    )
  }

  const toggleAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success"
      case "Low Stock":
        return "warning"
      case "Out of Stock":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory and listings</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Modern Sofa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="living-room">Living Room</SelectItem>
                        <SelectItem value="bedroom">Bedroom</SelectItem>
                        <SelectItem value="dining-room">Dining Room</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                        <SelectItem value="lighting">Lighting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price ($)</Label>
                    <Input id="product-price" type="number" placeholder="499" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-stock">Stock Quantity</Label>
                    <Input id="product-stock" type="number" placeholder="10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    placeholder="Enter product description..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="border rounded-md p-4 flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Drag and drop images here or click to browse</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Upload Images
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured">Featured product</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-8 w-[300px]" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Category</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Price Range</DropdownMenuItem>
              <DropdownMenuItem>Stock Level</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="10">
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">per page</span>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onCheckedChange={toggleAllProducts}
                />
              </TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProductSelection(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "Active"
                        ? "outline"
                        : product.status === "Low Stock"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>10</strong> of <strong>100</strong> results
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


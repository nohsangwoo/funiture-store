import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FurniCraft - Premium Furniture & Interior Decor",
  description:
    "Discover premium furniture and interior decor at FurniCraft. Shop our collection of modern, classic, and contemporary pieces for your dream space.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen items-center`}>{children}</body>
    </html>
  )
}



import './globals.css'
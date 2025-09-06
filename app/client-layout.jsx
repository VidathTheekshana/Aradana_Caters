"use client"

import React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { OrderProvider } from "@/contexts/order-context"
import { AuthProvider } from "@/contexts/auth-context"
import { useSearchParams } from "next/navigation"
import "./globals.css"

export default function ClientLayout({ children }) {
  const searchParams = useSearchParams()

  return (
    <div className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <OrderProvider>{children}</OrderProvider>
        </AuthProvider>
      </React.Suspense>
      <Analytics />
    </div>
  )
}

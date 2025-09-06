"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import LayoutWrapper from "@/components/layout-wrapper"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/order`,
        },
      })
      if (error) throw error
      router.push("/order")
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LayoutWrapper>
      <div className="flex min-h-[80vh] w-full items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Card className="border-rose-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-rose-900">Welcome Back</CardTitle>
              <CardDescription className="text-rose-700">Sign in to your Aradana Caterers account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-rose-800">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-rose-800">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm text-rose-700">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-rose-600 hover:text-rose-800 underline underline-offset-4">
                    Sign up here
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}

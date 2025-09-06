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

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/order`,
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      router.push("/auth/signup-success")
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
              <CardTitle className="text-2xl text-rose-900">Join Aradana Caterers</CardTitle>
              <CardDescription className="text-rose-700">Create your account to start ordering</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName" className="text-rose-800">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
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
                      placeholder="At least 6 characters"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-rose-800">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm text-rose-700">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-rose-600 hover:text-rose-800 underline underline-offset-4">
                    Sign in here
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

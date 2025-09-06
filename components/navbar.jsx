"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useOrder } from "@/contexts/order-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { getItemCount } = useOrder()
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleOrderClick = (e) => {
    if (!user && !loading) {
      e.preventDefault()
      router.push("/auth/login")
    }
  }

  const itemCount = getItemCount()

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">Aradana Caterers</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-foreground hover:text-primary transition-colors font-medium">
              Menu
            </Link>
            <Link
              href="/order"
              className="text-foreground hover:text-primary transition-colors font-medium relative"
              onClick={handleOrderClick}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order
                {itemCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs min-w-5 h-5 flex items-center justify-center p-0">
                    {itemCount}
                  </Badge>
                )}
              </div>
            </Link>

            {loading ? (
              <div className="w-20 h-9 bg-muted animate-pulse rounded"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <User className="h-4 w-4" />
                    {user.email?.split("@")[0] || "Account"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem disabled className="text-sm text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/order" className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/order" className="relative" onClick={handleOrderClick}>
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs min-w-5 h-5 flex items-center justify-center p-0">
                  {itemCount}
                </Badge>
              )}
            </Link>
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/order"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={(e) => {
                  handleOrderClick(e)
                  setIsOpen(false)
                }}
              >
                Order ({itemCount} items)
              </Link>

              <div className="border-t border-border pt-2 mt-2">
                {loading ? (
                  <div className="px-3 py-2">
                    <div className="w-full h-9 bg-muted animate-pulse rounded"></div>
                  </div>
                ) : user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground border-b border-border">{user.email}</div>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="px-3 py-2 space-y-2">
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

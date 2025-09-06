"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LayoutWrapper from "@/components/layout-wrapper"
import { useOrder } from "@/contexts/order-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"
import Link from "next/link"

export default function OrderPage() {
  const { items, customerInfo, removeItem, updateQuantity, setCustomerInfo, getTotal, clearOrder } = useOrder()
  const { user, loading } = useAuth()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.email && !customerInfo.email) {
      setCustomerInfo({
        ...customerInfo,
        email: user.email,
      })
    }
  }, [user, customerInfo, setCustomerInfo])

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo({
      ...customerInfo,
      [field]: value,
    })
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      alert(
        `Order placed successfully! Total: $${getTotal().toFixed(2)}\n\nThank you ${customerInfo.name}! We will contact you shortly to confirm your order details.`,
      )
      clearOrder()
      setCustomerInfo({
        name: "",
        phone: "",
        email: user?.email || "",
        address: "",
        eventDate: "",
        eventType: "",
        guestCount: "",
        specialRequests: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (!user) {
    return null
  }

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto" />
              <h1 className="text-3xl font-bold text-foreground">Your Order is Empty</h1>
              <p className="text-lg text-muted-foreground">Add some delicious items from our menu to get started!</p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Your <span className="text-primary">Order</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Review your items and provide your details to complete the order
            </p>
            <p className="text-sm text-primary">Welcome back, {user.email}!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-primary">{items.length} items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${(Number.parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOrder} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={customerInfo.name}
                          onChange={(e) => handleCustomerInfoChange("name", e.target.value)}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => handleCustomerInfoChange("phone", e.target.value)}
                          required
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleCustomerInfoChange("email", e.target.value)}
                        required
                        placeholder="your.email@example.com"
                        readOnly={!!user?.email}
                        className={user?.email ? "bg-muted" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => handleCustomerInfoChange("address", e.target.value)}
                        required
                        placeholder="Enter complete delivery address"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Event Date *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={customerInfo.eventDate}
                          onChange={(e) => handleCustomerInfoChange("eventDate", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guestCount">Number of Guests *</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          value={customerInfo.guestCount}
                          onChange={(e) => handleCustomerInfoChange("guestCount", e.target.value)}
                          required
                          placeholder="50"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type</Label>
                      <Select
                        value={customerInfo.eventType}
                        onValueChange={(value) => handleCustomerInfoChange("eventType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="birthday">Birthday Party</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                          <SelectItem value="religious">Religious Ceremony</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={customerInfo.specialRequests}
                        onChange={(e) => handleCustomerInfoChange("specialRequests", e.target.value)}
                        placeholder="Any dietary restrictions, special arrangements, or additional requests..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <LoadingSpinner size="sm" />
                          Placing Order...
                        </div>
                      ) : (
                        `Place Order - $${getTotal().toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

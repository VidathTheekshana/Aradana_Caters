"use client"

import { useState } from "react"
import { useOrder } from "@/contexts/order-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ToastNotification from "@/components/toast-notification"
import Link from "next/link"

export default function FeaturedItems() {
  const { addItem } = useOrder()
  const [toast, setToast] = useState({ isVisible: false, message: "" })

  const featuredItems = [
    {
      id: 9,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with tender chicken, saffron, and traditional spices",
      price: "LKR 1,500",
      image: "/delicious-chicken-biryani-with-saffron-rice-and-ga.jpg",
      category: "Rice & Biryani",
      isVegetarian: false,
    },
    {
      id: 6,
      name: "Paneer Butter Masala",
      description: "Creamy tomato curry with soft paneer cubes and aromatic herbs",
      price: "LKR 2000",
      image: "/creamy-paneer-butter-masala-curry-with-naan-bread.jpg",
      category: "Main Course",
      isVegetarian: true,
    },
    {
      id: 1,
      name: "Samosa Platter",
      description: "Crispy pastries filled with spiced potatoes and peas, served with chutneys",
      price: "LKR 800",
      image: "/golden-crispy-samosas-with-mint-and-tamarind-chutn.jpg",
      category: "Starters",
      isVegetarian: true,
    },
  ]

  const handleAddToOrder = (item) => {
    addItem(item)
    setToast({
      isVisible: true,
      message: `${item.name} added to your order!`,
    })
  }

  return (
    <>
      <ToastNotification
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ isVisible: false, message: "" })}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Featured <span className="text-primary">Specialties</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our most popular dishes, crafted with authentic recipes and the finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-300 border-border overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleAddToOrder(item)}>
                      Add to Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

"use client"

import { useState } from "react"
import LayoutWrapper from "@/components/layout-wrapper"
import { useOrder } from "@/contexts/order-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ToastNotification from "@/components/toast-notification"

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [toast, setToast] = useState({ isVisible: false, message: "" })
  const { addItem } = useOrder()

  const categories = ["All", "Starters", "Main Course", "Rice & Biryani", "Breads", "Desserts", "Beverages"]

  const menuItems = [
   // Sri Lankan Specialties
{
  id: 20,
  name: "Sri Lankan Egg Hopper",
  description: "Crispy bowl-shaped pancake with a soft egg center, served with sambol",
  price: "Rs 250",
  category: "Sri Lankan",
  image: "/sri-lankan-egg-hopper-with-pol-sambol.jpg",
  isVegetarian: false,
},
{
  id: 21,
  name: "Kottu Roti",
  description: "Chopped flatbread stir-fried with vegetables, eggs, and your choice of chicken or beef",
  price: "Rs 950",
  category: "Sri Lankan",
  image: "/chicken-kottu-roti-with-curry.jpg",
  isVegetarian: false,
},
{
  id: 22,
  name: "Pol Sambol with Rice",
  description: "Coconut sambol served with steamed rice and dhal curry",
  price: "Rs 650",
  category: "Sri Lankan",
  image: "/sri-lankan-pol-sambol-with-rice-and-dhal.jpg",
  isVegetarian: true,
},
{
  id: 23,
  name: "Fish Ambul Thiyal",
  description: "Traditional sour fish curry cooked with goraka and spices",
  price: "Rs 1,200",
  category: "Sri Lankan",
  image: "/sri-lankan-fish-ambul-thiyal-curry.jpg",
  isVegetarian: false,
},

// Western Dishes
{
  id: 24,
  name: "Grilled Steak with Fries",
  description: "Juicy grilled beef steak served with golden fries and pepper sauce",
  price: "Rs 2,800",
  category: "Western",
  image: "/grilled-steak-with-fries-and-pepper-sauce.jpg",
  isVegetarian: false,
},
{
  id: 25,
  name: "Classic Caesar Salad",
  description: "Fresh romaine lettuce with Caesar dressing, parmesan, and croutons",
  price: "Rs 750",
  category: "Western",
  image: "/classic-caesar-salad-with-croutons.jpg",
  isVegetarian: true,
},
{
  id: 26,
  name: "Spaghetti Carbonara",
  description: "Pasta tossed in creamy sauce with pancetta, parmesan, and egg yolk",
  price: "Rs 1,350",
  category: "Western",
  image: "/spaghetti-carbonara-with-parmesan.jpg",
  isVegetarian: false,
},
{
  id: 27,
  name: "Margherita Pizza",
  description: "Thin-crust pizza topped with tomato sauce, mozzarella, and fresh basil",
  price: "Rs 1,100",
  category: "Western",
  image: "/classic-margherita-pizza-with-fresh-basil.jpg",
  isVegetarian: true,
},

// Desserts (Sri Lankan & Western Fusion)
{
  id: 28,
  name: "Watalappan",
  description: "Sri Lankan spiced jaggery pudding with coconut milk and cashews",
  price: "Rs 450",
  category: "Desserts",
  image: "/sri-lankan-watalappan-dessert.jpg",
  isVegetarian: true,
},
{
  id: 29,
  name: "Chocolate Lava Cake",
  description: "Rich molten chocolate cake with a gooey center, served with vanilla ice cream",
  price: "Rs 650",
  category: "Desserts",
  image: "/chocolate-lava-cake-with-ice-cream.jpg",
  isVegetarian: true,
}

  ]

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const handleAddToOrder = (item) => {
    addItem(item)
    setToast({
      isVisible: true,
      message: `${item.name} added to your order!`,
    })
  }

  return (
    <LayoutWrapper>
      <ToastNotification
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ isVisible: false, message: "" })}
      />

      <div className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our authentic Indian and South Asian dishes, crafted with traditional recipes and the finest
              ingredients
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-300 border-border overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isVegetarian && (
                    <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-600">Vegetarian</Badge>
                  )}
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xl font-bold text-primary">{item.price}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => handleAddToOrder(item)}>
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No items message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No items found in this category.</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16 space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Ready to Order?</h3>
            <p className="text-muted-foreground">
              Contact us for custom catering packages and bulk orders for your special events
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="/order">Place Your Order</a>
            </Button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

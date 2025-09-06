import LayoutWrapper from "@/components/layout-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, Users, Clock } from "lucide-react"
import FeaturedItems from "@/components/featured-items"

export default function HomePage() {
  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-card to-background py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  <span className="text-foreground">Authentic</span>{" "}
                  <span className="text-primary">Sri Lankan Favourites</span>{" "}
                  <span className="text-foreground">for Every Celebration</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Experience the rich flavors and aromatic spices of traditional Indian and South Asian cuisine. Perfect
                  for weddings, corporate events, and special occasions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  <Link href="/order">Order Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <Link href="/menu">View Menu</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">500+ Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">1000+ Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">15+ Years</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/beautiful-indian-feast-spread-with-multiple-colorf.jpg"
                  alt="Delicious Indian feast spread"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">A+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Food Safety Certified</p>
                    <p className="text-sm text-muted-foreground">Licensed & Insured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <FeaturedItems />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Why Choose <span className="text-primary">Aradana Caterers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Expert Chefs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our experienced chefs bring authentic flavors from traditional family recipes passed down through
                generations.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use only the finest ingredients and spices, ensuring every dish meets our high standards of
                excellence.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Reliable Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                Punctual delivery and professional service for all your events, from intimate gatherings to large
                celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}

import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Aradana Caterers</h3>
            <p className="text-muted-foreground leading-relaxed">
              Authentic Indian and South Asian cuisine for all your special occasions. We bring the flavors of tradition
              to your celebrations.
            </p>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Mon-Sun: 9AM - 9PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/menu" className="block text-muted-foreground hover:text-primary transition-colors">
                Our Menu
              </Link>
              <Link href="/order" className="block text-muted-foreground hover:text-primary transition-colors">
                Place Order
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">011 260 44 73</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">www.aradanacaterers.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">49/c,Maharagama Road,Mampe,Piliyandala</span>
              </div>
            </div>
          </div>

          {/* Social Media & Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
            <div className="space-y-2 pt-2">
              <p className="text-sm text-muted-foreground">✓ Free Delivery (Above 100+)</p>
              <p className="text-sm text-muted-foreground">✓ Custom Menu Planning</p>
              <p className="text-sm text-muted-foreground">✓ Licensed & Insured</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © 2024 Aradana Caterers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

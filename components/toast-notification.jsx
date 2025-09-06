"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ToastNotification({ message, isVisible, onClose, type = "success" }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-background border border-border rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-80">
        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
        <p className="text-foreground font-medium flex-1">{message}</p>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

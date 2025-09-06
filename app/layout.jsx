export const metadata = {
  title: "Aradana Caterers - Authentic Indian Cuisine",
  description: "Experience authentic Indian and South Asian cuisine for your special events",
  generator: "v0.app",
}

import ClientLayout from "./client-layout"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}


import './globals.css'
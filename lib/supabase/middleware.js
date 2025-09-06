import { NextResponse } from "next/server"

export async function updateSession(request) {
  // For now, just handle route protection on the client side
  // The auth context will handle redirects
  if (request.nextUrl.pathname === "/order") {
    // Let the client-side auth context handle the redirect
    return NextResponse.next()
  }

  return NextResponse.next()
}

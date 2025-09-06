import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LayoutWrapper from "@/components/layout-wrapper"

export default function SignupSuccessPage() {
  return (
    <LayoutWrapper>
      <div className="flex min-h-[80vh] w-full items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-rose-200">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-2xl text-rose-900">Check Your Email!</CardTitle>
              <CardDescription className="text-rose-700">We've sent you a confirmation link</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-rose-600">
                Please check your email and click the confirmation link to activate your account. Once confirmed, you'll
                be able to sign in and start placing orders.
              </p>
              <div className="pt-4">
                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/auth/login">Back to Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4" suppressHydrationWarning>
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Manage Your Contacts{" "}
            <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern contact management application built with Next.js, Spring Boot,
            and PostgreSQL. Store, organize, and access your contacts from anywhere.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Create Account
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Easy to Use</h3>
            <p className="text-muted-foreground">
              Simple and intuitive interface for managing your contacts with ease.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Secure</h3>
            <p className="text-muted-foreground">
              Your data is encrypted and stored securely in our cloud database.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Always Available</h3>
            <p className="text-muted-foreground">
              Access your contacts anytime, anywhere, from any device.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { register } from "@/lib/api"
import { useAuthStore } from "@/store/auth"
import { ROUTES } from "@/lib/constants"

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { setAuth, isAuthenticated } = useAuthStore()

  React.useEffect(() => {
    if (isAuthenticated()) {
      router.push(ROUTES.HOME)
      return
    }
  }, [isAuthenticated, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  })

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setAuth(data.user, data.token)
      toast({
        title: "Success",
        description: "Account created successfully.",
      })
      router.push(ROUTES.HOME)
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to create account.",
      })
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    registerMutation.mutate(data)
  }

  // If authenticated, don't render the register form
  if (isAuthenticated()) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-4 py-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
} 
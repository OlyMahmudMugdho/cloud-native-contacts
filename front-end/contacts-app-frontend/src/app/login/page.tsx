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
import { login } from "@/lib/api"
import { useAuthStore } from "@/store/auth"
import { ROUTES } from "@/lib/constants"

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { setAuth, isAuthenticated } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.token)
      toast({
        title: "Success",
        description: "Logged in successfully.",
      })
      router.push(ROUTES.CONTACTS)
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Invalid credentials.",
      })
    },
  })

  React.useEffect(() => {
    if (isAuthenticated()) {
      router.push(ROUTES.CONTACTS)
      return
    }
  }, [isAuthenticated, router])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loginMutation.mutate(data)
  }

  if (isAuthenticated()) {
    return null
  }

  return (
    <div className="flex items-center justify-center p-4 md:py-8">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-right">
                      <Link href={ROUTES.FORGOT_PASSWORD} className="text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-4 py-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
  
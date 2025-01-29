"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createContact, getContact, updateContact } from "@/lib/api"
import type { Contact, CreateContactRequest } from "@/lib/api"
import { useToast } from "./ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")).default(""),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters").optional().or(z.literal("")).default(""),
  description: z.any()
})

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contactId: string | null
  onClose: () => void
}

export function ContactDialog({
  open,
  onOpenChange,
  contactId,
  onClose,
}: ContactDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      description: "",
    },
  })

  const { isLoading: isLoadingContact } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: async () => {
      if (!contactId) return null
      const data = await getContact(contactId)
      form.reset({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        description: data.description,
      })
      return data
    },
    enabled: !!contactId,
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateContactRequest) => createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      toast({
        title: "Success",
        description: "Contact created successfully.",
      })
      handleClose()
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to create contact."
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: CreateContactRequest) => updateContact(contactId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      toast({
        title: "Success",
        description: "Contact updated successfully.",
      })
      handleClose()
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to update contact."
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const requestData: CreateContactRequest = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: values.email || null,
      address: values.address || null,
      description: values.description || null
    };
    
    if (contactId) {
      updateMutation.mutate(requestData)
    } else {
      createMutation.mutate(requestData)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contactId ? "Edit Contact" : "Add Contact"}</DialogTitle>
          <DialogDescription>
            {contactId
              ? "Edit the contact details below."
              : "Add a new contact to your list."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : contactId
                  ? "Save Changes"
                  : "Add Contact"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 
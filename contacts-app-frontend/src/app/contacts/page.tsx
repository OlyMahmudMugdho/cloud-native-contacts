"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { getContacts } from "@/lib/api"
import { useContactsStore } from "@/store/contacts"
import { useAuthStore } from "@/store/auth"
import { ContactDialog } from "@/components/contact-dialog"

export default function ContactsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuthStore()
  const { contacts, setContacts, currentPage, setCurrentPage } = useContactsStore()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<string | null>(null)

  const { isLoading } = useQuery({
    queryKey: ["contacts", currentPage],
    queryFn: async () => {
      try {
        const data = await getContacts(currentPage)
        setContacts(data.content, data.totalPages)
        return data
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to fetch contacts."
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
        throw error
      }
    },
  })

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Contact</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact.id)
                        setIsDialogOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ContactDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        contactId={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  )
} 
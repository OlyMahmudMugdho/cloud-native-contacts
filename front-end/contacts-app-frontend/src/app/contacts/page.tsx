"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { getContacts, getImageUrl } from "@/lib/api"
import { useContactsStore } from "@/store/contacts"
import { useAuthStore } from "@/store/auth"
import { ContactDialog } from "@/components/contact-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Phone, Mail, MapPin } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteContact } from "@/lib/api"
import { ROUTES } from "@/lib/constants"

export default function ContactsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuthStore()
  const { contacts, setContacts, currentPage, setCurrentPage, deleteContact: removeContact } = useContactsStore()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<string | null>(null)
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push(ROUTES.LOGIN)
      return
    }
  }, [isAuthenticated, router])

  // Clear contacts when component unmounts (e.g., on logout)
  React.useEffect(() => {
    return () => {
      setContacts([], 0)
      // Also clear the query cache for this user
      queryClient.removeQueries({ queryKey: ["contacts"] })
    }
  }, [setContacts, queryClient])

  const { isLoading } = useQuery({
    queryKey: ["contacts", currentPage, user?.username], // Add username to query key
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
    staleTime: 0, // Consider data stale immediately
    gcTime: 0,    // Don't keep the cache
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: true // Always refetch on mount
  })

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: (_, id) => {
      removeContact(id)
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      toast({
        title: "Success",
        description: "Contact deleted successfully.",
      })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to delete contact."
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
    },
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Button onClick={() => {
          setSelectedContact(null)
          setIsDialogOpen(true)
        }}>
          Add Contact
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No contacts found. Add your first contact to get started.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={getImageUrl(contact.photoUrl)} 
                    alt={contact.name}
                    onError={(e) => {
                      // If image fails to load, show fallback
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <AvatarFallback>
                    {getInitials(contact.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{contact.name}</CardTitle>
                  {contact.description && (
                    <CardDescription>{contact.description}</CardDescription>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phoneNumber}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.address && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{contact.address}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedContact(contact.id)
                    setIsDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this contact? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(contact.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ContactDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        contactId={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  )
} 
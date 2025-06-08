"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { Bell, Send, Plus, Clock, Users, AlertCircle } from "lucide-react"

type Notification = {
  id: number
  title: string
  message: string
  category: "all" | "adults" | "kids"
  type: "info" | "warning" | "urgent"
  scheduledFor?: string
  sentAt?: string
  status: "draft" | "scheduled" | "sent"
}

export default function NotificationsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Training Reminder",
      message: "Don't forget about today's training session at 18:00. Please arrive 10 minutes early for warm-up.",
      category: "adults",
      type: "info",
      scheduledFor: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(), // 10 hours from now
      status: "scheduled",
    },
    {
      id: 2,
      title: "Belt Examination",
      message: "Belt examinations will be held on July 15th. Students with required attendances will be notified.",
      category: "all",
      type: "warning",
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      status: "sent",
    },
  ])

  const [newNotification, setNewNotification] = useState<Partial<Notification>>({
    title: "",
    message: "",
    category: "all",
    type: "info",
    status: "draft",
  })

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const isInstructor = currentUser?.category === "instructor"

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Error",
        description: "Please fill in title and message.",
        variant: "destructive",
      })
      return
    }

    const notification: Notification = {
      id: notifications.length + 1,
      title: newNotification.title!,
      message: newNotification.message!,
      category: newNotification.category as "all" | "adults" | "kids",
      type: newNotification.type as "info" | "warning" | "urgent",
      status: "sent",
      sentAt: new Date().toISOString(),
    }

    setNotifications([notification, ...notifications])
    setNewNotification({
      title: "",
      message: "",
      category: "all",
      type: "info",
      status: "draft",
    })
    setIsCreateDialogOpen(false)

    toast({
      title: "Notification Sent",
      description: `Notification sent to ${notification.category} students.`,
    })
  }

  const scheduleTrainingReminder = () => {
    const reminderTime = new Date()
    reminderTime.setHours(reminderTime.getHours() + 10) // 10 hours before training

    const reminder: Notification = {
      id: notifications.length + 1,
      title: "Training Reminder - Tomorrow",
      message: "Reminder: You have training tomorrow. Please confirm your attendance.",
      category: "all",
      type: "info",
      scheduledFor: reminderTime.toISOString(),
      status: "scheduled",
    }

    setNotifications([reminder, ...notifications])

    toast({
      title: "Training Reminder Scheduled",
      description: "Automatic reminder set for 10 hours before training.",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "destructive"
      case "warning":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "sent":
        return <Send className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  if (!isInstructor) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Your recent notifications from the dojo</p>
        </div>

        <div className="space-y-4">
          {notifications
            .filter((n) => n.category === "all" || n.category === currentUser?.category)
            .map((notification) => (
              <Card key={notification.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      {notification.title}
                    </CardTitle>
                    <Badge variant={getTypeColor(notification.type)} className="capitalize">
                      {notification.type}
                    </Badge>
                  </div>
                  <CardDescription>
                    {notification.sentAt
                      ? `Sent ${new Date(notification.sentAt).toLocaleDateString()}`
                      : `Scheduled for ${new Date(notification.scheduledFor!).toLocaleDateString()}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{notification.message}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Management</h1>
          <p className="text-muted-foreground">Send updates and reminders to students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={scheduleTrainingReminder}>
            <Clock className="mr-2 h-4 w-4" />
            Schedule Training Reminder
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send New Notification</DialogTitle>
                <DialogDescription>Create and send a notification to students.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title*
                  </Label>
                  <Input
                    id="title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Send To*
                  </Label>
                  <Select
                    value={newNotification.category}
                    onValueChange={(value) => setNewNotification({ ...newNotification, category: value as any })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="adults">Adults Only</SelectItem>
                      <SelectItem value="kids">Kids Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Priority*
                  </Label>
                  <Select
                    value={newNotification.type}
                    onValueChange={(value) => setNewNotification({ ...newNotification, type: value as any })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message*
                  </Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNotification}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Notifications</h2>
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(notification.status)}
                  {notification.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant={getTypeColor(notification.type)} className="capitalize">
                    {notification.type}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {notification.category}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {notification.status}
                  </Badge>
                </div>
              </div>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {notification.category === "all" ? "All students" : `${notification.category} students`}
                </span>
                <span>
                  {notification.sentAt
                    ? `Sent ${new Date(notification.sentAt).toLocaleDateString()}`
                    : `Scheduled for ${new Date(notification.scheduledFor!).toLocaleDateString()}`}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{notification.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

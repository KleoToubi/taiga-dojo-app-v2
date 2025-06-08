"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Home, Users, MessageSquareText, Settings, LogOut, User, Bell, ClipboardCheck } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    } else {
      // Redirect to sign-in if no user data
      router.push("/signin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userRole")
    router.push("/signin")
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
  }

  const toggleRole = () => {
    if (currentUser?.category !== "instructor") return

    const newRole = currentUser?.category === "instructor" ? "student" : "instructor"
    const updatedUser = { ...currentUser, category: newRole }
    setCurrentUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    localStorage.setItem("userRole", newRole)

    toast({
      title: t("switchedToRole").replace("{role}", newRole === "instructor" ? "Instructor" : "Student"),
      description: "This is for demonstration purposes only.",
    })
  }

  const instructorMenuItems = [
    { title: t("dashboard"), icon: Home, path: "/dashboard" },
    { title: t("students"), icon: Users, path: "/dashboard/students" },
    { title: t("schedule"), icon: Calendar, path: "/dashboard/schedule" },
    { title: "Attendance", icon: ClipboardCheck, path: "/dashboard/attendance" },
    { title: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { title: t("assistant"), icon: MessageSquareText, path: "/dashboard/assistant" },
    { title: t("settings"), icon: Settings, path: "/dashboard/settings" },
  ]

  const studentMenuItems = [
    { title: t("myProgress"), icon: User, path: "/dashboard" },
    { title: t("schedule"), icon: Calendar, path: "/dashboard/schedule" },
    { title: "Attendance", icon: ClipboardCheck, path: "/dashboard/attendance" },
    { title: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { title: t("assistant"), icon: MessageSquareText, path: "/dashboard/assistant" },
  ]

  const menuItems = currentUser?.category === "instructor" ? instructorMenuItems : studentMenuItems

  if (!currentUser) {
    return null // Don't render sidebar if no user
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <Image src="/images/taiga-logo.png" alt="Taiga Dojo Logo" fill className="object-contain" />
            </div>
            <h1 className="text-xl font-bold text-primary">{t("companyName")}</h1>
            <p className="text-xs text-muted-foreground">{t("companySubtitle")}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.title}>
                <Link href={item.path}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>
                  {currentUser?.category === "instructor" ? "IN" : currentUser?.name?.charAt(0) || "ST"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {currentUser?.category === "instructor" ? "Instructor" : "Student"}
                </p>
                {currentUser?.id && <p className="text-xs text-muted-foreground">ID: {currentUser.id}</p>}
              </div>
            </div>
            <div className="flex gap-1">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {currentUser?.category === "instructor" && (
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={toggleRole}>
                <User className="mr-2 h-4 w-4" />
                {t("switchRole")}
              </Button>
            )}
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t("logout")}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

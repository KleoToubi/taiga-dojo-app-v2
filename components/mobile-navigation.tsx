"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, Calendar, MessageSquareText, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [userRole, setUserRole] = useState<"instructor" | "student">("instructor")

  // Get user role from localStorage on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as "instructor" | "student" | null
    if (savedRole) {
      setUserRole(savedRole)
    }
  }, [])

  const instructorMenuItems = [
    { title: t("dashboard"), icon: Home, path: "/" },
    { title: t("students"), icon: Users, path: "/students" },
    { title: t("schedule"), icon: Calendar, path: "/schedule" },
    { title: t("assistant"), icon: MessageSquareText, path: "/assistant" },
    { title: t("settings"), icon: Settings, path: "/settings" },
  ]

  const studentMenuItems = [
    { title: t("myProgress"), icon: Home, path: "/" },
    { title: t("schedule"), icon: Calendar, path: "/schedule" },
    { title: t("assistant"), icon: MessageSquareText, path: "/assistant" },
    { title: t("settings"), icon: Settings, path: "/settings" },
  ]

  const menuItems = userRole === "instructor" ? instructorMenuItems : studentMenuItems

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 bg-background border-t md:hidden">
      {menuItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex flex-1 flex-col items-center justify-center text-muted-foreground",
              isActive && "text-primary",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.title}</span>
          </Link>
        )
      })}
    </div>
  )
}

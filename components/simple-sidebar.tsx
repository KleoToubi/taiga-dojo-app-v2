"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Home, Users, MessageSquare, Settings, LogOut, User, Bell, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SimpleSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const instructorMenuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "Students", icon: Users, path: "/dashboard/students" },
    { title: "Schedule", icon: Calendar, path: "/dashboard/schedule" },
    { title: "Attendance", icon: ClipboardCheck, path: "/dashboard/attendance" },
    { title: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { title: "Assistant", icon: MessageSquare, path: "/dashboard/assistant" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ]

  const studentMenuItems = [
    { title: "My Progress", icon: User, path: "/dashboard" },
    { title: "Schedule", icon: Calendar, path: "/dashboard/schedule" },
    { title: "Attendance", icon: ClipboardCheck, path: "/dashboard/attendance" },
    { title: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { title: "Assistant", icon: MessageSquare, path: "/dashboard/assistant" },
  ]

  const menuItems = currentUser?.category === "instructor" ? instructorMenuItems : studentMenuItems

  if (!currentUser) {
    return null
  }

  return (
    <div className="h-screen w-64 border-r bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-2">
            <Image src="/images/taiga-logo.png" alt="Taiga Dojo Logo" fill className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Taiga Dojo</h1>
          <p className="text-xs text-gray-500">Kyokushin Karate</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto p-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {currentUser?.category === "instructor" ? "IN" : currentUser?.name?.charAt(0) || "ST"}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 capitalize">
              {currentUser?.category === "instructor" ? "Instructor" : "Student"}
            </p>
            {currentUser?.id && <p className="text-xs text-gray-500">ID: {currentUser.id}</p>}
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Users, Calendar, ClipboardList, Settings, LogOut, User } from "lucide-react"

export function SimpleSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/" },
    { icon: Users, label: "Students", href: "/dashboard/students/" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/schedule/" },
    { icon: ClipboardList, label: "Attendance", href: "/dashboard/attendance/" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings/" },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">🥋</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">Taiga Dojo</h2>
            <p className="text-sm text-gray-500">Kyokushin Karate</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Button
              key={item.href}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => router.push(item.href)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      {currentUser && (
        <div className="p-4 border-t border-gray-200">
          <Card className="p-3">
            <div className="flex items-center space-x-3 mb-3">
              <User className="h-8 w-8 text-gray-400" />
              <div>
                <p className="font-medium text-sm">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.id}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}

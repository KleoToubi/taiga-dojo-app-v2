"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setIsAuthenticated(true)
    } else {
      router.push("/signin")
      return
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Taiga Dojo</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {!isMobile && <AppSidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">{children}</main>
          {isMobile && <MobileNavigation />}
        </div>
      </div>
    </SidebarProvider>
  )
}

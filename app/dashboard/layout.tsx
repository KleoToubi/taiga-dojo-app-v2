"use client"

import type React from "react"
<<<<<<< HEAD
import { SimpleSidebar } from "@/components/simple-sidebar"
=======
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useIsMobile } from "@/hooks/use-mobile"
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
<<<<<<< HEAD
=======
  const isMobile = useIsMobile()
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setIsAuthenticated(true)
    } else {
<<<<<<< HEAD
      router.push("/")
=======
      router.push("/signin")
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0
      return
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Taiga Dojo</h1>
<<<<<<< HEAD
          <p className="text-gray-500">Loading...</p>
=======
          <p className="text-muted-foreground">Loading...</p>
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen">
<<<<<<< HEAD
      <SimpleSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
=======
      {!isMobile && <AppSidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">{children}</main>
        {isMobile && <MobileNavigation />}
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0
      </div>
    </div>
  )
}

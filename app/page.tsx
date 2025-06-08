"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      // User is logged in, redirect to dashboard
      router.push("/dashboard")
    } else {
      // User is not logged in, redirect to sign in
      router.push("/signin")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Taiga Dojo</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

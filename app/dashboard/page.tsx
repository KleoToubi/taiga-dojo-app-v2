"use client"
<<<<<<< HEAD

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
=======
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { InstructorDashboard } from "@/components/instructor-dashboard"
import { StudentDashboard } from "@/components/student-dashboard"

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
<<<<<<< HEAD
    }
  }, [])

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}!</h1>
        <p className="text-gray-600">
          {currentUser.category === "instructor" ? "Instructor Dashboard" : "Student Dashboard"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {currentUser.name}
              </p>
              <p>
                <strong>ID:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Category:</strong> {currentUser.category}
              </p>
              <p>
                <strong>Belt:</strong> {currentUser.belt}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your progress overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Classes attended: 15</p>
              <p>Current belt: {currentUser.belt}</p>
              <p>Next grading: In 2 months</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>• Attended class on Monday</p>
              <p>• Completed kata practice</p>
              <p>• Updated profile</p>
            </div>
          </CardContent>
        </Card>
      </div>
=======
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

  if (!currentUser) {
    return null
  }

  const isInstructor = currentUser.category === "instructor"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isInstructor ? t("dashboardTitle") : t("studentDashboardTitle")}
          </h1>
          <p className="text-muted-foreground">
            {isInstructor ? t("dashboardSubtitle") : t("studentDashboardSubtitle")}
          </p>
        </div>
      </div>

      {isInstructor ? <InstructorDashboard /> : <StudentDashboard />}
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0
    </div>
  )
}

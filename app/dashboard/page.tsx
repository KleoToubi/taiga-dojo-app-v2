"use client"
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

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
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
    </div>
  )
}

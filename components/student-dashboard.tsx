"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Clock, CheckCircle2 } from "lucide-react"
import { UpcomingClasses } from "@/components/upcoming-classes"
import { BeltRequirements } from "@/components/belt-requirements"
import { useLanguage } from "@/contexts/language-context"

export function StudentDashboard() {
  const { t } = useLanguage()

  // Mock data for student progress - in real app this would come from database
  const studentData = {
    name: "George Papadopoulos",
    currentBelt: "orange", // Updated to match syllabus
    attendances: 28,
    requiredAttendances: 36, // Updated based on 8th Kyu requirements
    nextBelt: "blue", // Updated to match syllabus progression
    registrationDate: "January 15, 2023",
    currentKyu: "9th-kyu", // Orange belt with black stripe
    nextKyu: "8th-kyu", // Blue belt
  }

  const progressPercentage = Math.round((studentData.attendances / studentData.requiredAttendances) * 100)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("currentBelt")}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`h-6 w-12 rounded-sm belt-${studentData.currentBelt}`}></div>
              <div className="text-xl font-bold capitalize">{t(`belts.${studentData.currentBelt}`)}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              9th Kyu - {t(`belts.${studentData.currentBelt}`)} with Black Stripe
            </p>
            <p className="text-xs text-muted-foreground">Member since {studentData.registrationDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("attendances")}</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentData.attendances} / {studentData.requiredAttendances}
            </div>
            <Progress value={progressPercentage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {studentData.requiredAttendances - studentData.attendances} more for next belt
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("nextBelt")}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`h-6 w-12 rounded-sm belt-${studentData.nextBelt}`}></div>
              <div className="text-xl font-bold capitalize">{t(`belts.${studentData.nextBelt}`)}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">8th Kyu - {t(`belts.${studentData.nextBelt}`)} Belt</p>
            <p className="text-xs text-muted-foreground">Estimated date: July 15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("nextTraining")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">18:00 - 19:30</p>
            <p className="text-xs text-muted-foreground">Kihon & Kata</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {t("beltRequirements")} - 8th Kyu ({t(`belts.blue`)})
            </CardTitle>
            <CardDescription>{t("requiredTechniques")}</CardDescription>
          </CardHeader>
          <CardContent>
            <BeltRequirements beltColor="8th-kyu" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("upcomingClasses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingClasses />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

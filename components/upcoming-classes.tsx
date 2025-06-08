"use client"

import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

export function UpcomingClasses() {
  const { t } = useLanguage()

  // Mock data for upcoming classes
  const classes = [
    {
      id: 1,
      day: t("monday"),
      date: "June 10",
      time: "18:00 - 19:30",
      instructor: t("senseiName"),
      focus: t("kinonKata"),
    },
    {
      id: 2,
      day: t("wednesday"),
      date: "June 12",
      time: "18:00 - 19:30",
      instructor: t("senseiName"),
      focus: t("kumiteConditioning"),
    },
    {
      id: 3,
      day: t("friday"),
      date: "June 14",
      time: "18:00 - 19:30",
      instructor: t("senseiName"),
      focus: t("kataApplications"),
    },
  ]

  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <div key={classItem.id} className="flex items-start space-x-4 rounded-md border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">
              {classItem.day}, {classItem.date}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {classItem.time}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{classItem.instructor}</Badge>
              <Badge variant="secondary">{classItem.focus}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

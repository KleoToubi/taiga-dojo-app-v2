"use client"

import { CheckCircle2, XCircle, Clock, Dumbbell, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { beltRequirements } from "@/lib/syllabus-data"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type BeltRequirementsProps = {
  beltColor: string
}

export function BeltRequirements({ beltColor }: BeltRequirementsProps) {
  const { t } = useLanguage()

  // Get requirements for the specified belt color
  const requirements = beltRequirements[`${beltColor}` as keyof typeof beltRequirements]

  if (!requirements) {
    return <div>Belt requirements not found</div>
  }

  // Mock student progress - in real app this would come from database
  const studentProgress = {
    attendances: 28,
    completedTechniques: ["Fudo Dachi", "Yoi Dachi", "Seiken Jodan Tsuki"],
  }

  const progressPercentage = Math.min(100, (studentProgress.attendances / requirements.attendances) * 100)

  return (
    <div className="space-y-6">
      {/* Belt Info */}
      <div className="flex items-center gap-3">
        <div className={`h-8 w-16 rounded-sm belt-${requirements.color}`}></div>
        <div>
          <h3 className="font-semibold">{requirements.name}</h3>
          <p className="text-sm text-muted-foreground">{requirements.timeLimit}</p>
        </div>
      </div>

      <Separator />

      {/* Attendance Progress */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium">{t("attendances")}</h4>
          <Badge variant="outline">
            {studentProgress.attendances} / {requirements.attendances}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {requirements.attendances - studentProgress.attendances > 0
              ? `${requirements.attendances - studentProgress.attendances} more sessions needed`
              : "Attendance requirement met!"}
          </p>
        </div>
      </div>

      <Separator />

      {/* Techniques */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium">{t("techniques")}</h4>
          <Badge variant="outline">
            {studentProgress.completedTechniques.length} / {requirements.techniques.length}
          </Badge>
        </div>
        <div className="space-y-2">
          {requirements.techniques.map((technique) => {
            const isCompleted = studentProgress.completedTechniques.includes(technique.name)
            return (
              <div key={technique.name} className="flex items-start justify-between p-3 border rounded-md">
                <div className="flex-1">
                  <div className="font-medium text-sm">{technique.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{technique.description}</div>
                </div>
                <div className="ml-3">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Exercises */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium">{t("exercises")}</h4>
        </div>
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm">{requirements.exercises}</p>
        </div>
      </div>

      {/* Kumite */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium">{t("kumite")}</h4>
        </div>
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm">{requirements.kumite}</p>
        </div>
      </div>
    </div>
  )
}

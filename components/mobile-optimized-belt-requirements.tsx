"use client"
import { CheckCircle2, XCircle, Clock, Dumbbell, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { beltRequirements } from "@/lib/syllabus-data"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type BeltRequirementsProps = {
  beltColor: string
}

export function MobileOptimizedBeltRequirements({ beltColor }: BeltRequirementsProps) {
  const { t } = useLanguage()
  const requirements = beltRequirements[`${beltColor}` as keyof typeof beltRequirements]

  if (!requirements) {
    return <div>Belt requirements not found</div>
  }

  // Mock student progress
  const studentProgress = {
    attendances: 28,
    completedTechniques: ["Fudo Dachi", "Yoi Dachi", "Seiken Jodan Tsuki"],
  }

  const progressPercentage = Math.min(100, (studentProgress.attendances / requirements.attendances) * 100)

  return (
    <div className="space-y-4">
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

      {/* Techniques - Using Accordion for better mobile UX */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="techniques">
          <AccordionTrigger className="flex items-center gap-2 py-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t("techniques")}</span>
            <Badge variant="outline" className="ml-2">
              {studentProgress.completedTechniques.length} / {requirements.techniques.length}
            </Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exercises">
          <AccordionTrigger className="flex items-center gap-2 py-2">
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t("exercises")}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">{requirements.exercises}</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kumite">
          <AccordionTrigger className="flex items-center gap-2 py-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t("kumite")}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">{requirements.kumite}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

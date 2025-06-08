"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function SignInPage() {
  const [studentId, setStudentId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const router = useRouter()

  // Mock student database - in real app this would be from your database
  const students = [
    { id: "TG001", name: "George Papadopoulos", category: "adult", belt: "orange" },
    { id: "TG002", name: "Maria Constantine", category: "adult", belt: "orange" },
    { id: "TG003", name: "Nick Anthony", category: "adult", belt: "white" },
    { id: "TG004", name: "Helen Dimitriou", category: "adult", belt: "green" },
    { id: "TG005", name: "Kostas Papandreou", category: "adult", belt: "yellow" },
    { id: "TG006", name: "Sofia Alexiou", category: "adult", belt: "blue" },
    { id: "TG007", name: "Dimitris Vasiliou", category: "adult", belt: "brown" },
    { id: "TG008", name: "Anastasia Georgiou", category: "adult", belt: "white" },
    { id: "TG009", name: "Alex Petrov", category: "kids", belt: "yellow" },
    { id: "TG010", name: "Emma Johnson", category: "kids", belt: "orange" },
    { id: "SENSEI", name: "Sensei Dimitris", category: "instructor", belt: "black" },
  ]

  const handleSignIn = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const student = students.find((s) => s.id.toUpperCase() === studentId.toUpperCase())

    if (student) {
      // Store user data in localStorage
      localStorage.setItem("currentUser", JSON.stringify(student))
      localStorage.setItem("userRole", student.category === "instructor" ? "instructor" : "student")

      toast({
        title: "Sign In Successful",
        description: `Welcome back, ${student.name}!`,
      })

      router.push("/dashboard")
    } else {
      toast({
        title: "Invalid Student ID",
        description: "Please check your Student ID and try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20">
              <Image src="/images/taiga-logo.png" alt="Taiga Dojo Logo" width={80} height={80} />
            </div>
          </div>
          <CardTitle className="text-2xl">{t("companyName")}</CardTitle>
          <CardDescription>{t("companySubtitle")} - Student Sign In</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              placeholder="Enter your Student ID (e.g., TG001)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSignIn()}
            />
          </div>
          <Button onClick={handleSignIn} disabled={isLoading || !studentId} className="w-full">
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <p>Demo IDs:</p>
            <p>Student: TG001, TG009 (kids)</p>
            <p>Instructor: SENSEI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

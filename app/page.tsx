"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function HomePage() {
  const [studentId, setStudentId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock student database
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
    if (!mounted) return

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

      router.push("/dashboard/")
    } else {
      toast({
        title: "Invalid Student ID",
        description: "Please check your Student ID and try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Taiga Dojo</h1>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">🥋</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Taiga Dojo</CardTitle>
          <CardDescription>Kyokushin Karate - Student Sign In</CardDescription>
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

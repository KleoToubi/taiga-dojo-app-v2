"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
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
    </div>
  )
}

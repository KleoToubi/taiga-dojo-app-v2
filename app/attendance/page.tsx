"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { CheckCircle2, XCircle, Clock, Users } from "lucide-react"

type AttendanceRecord = {
  id: number
  studentId: string
  studentName: string
  classId: number
  className: string
  date: string
  status: "present" | "absent" | "pending"
}

export default function AttendancePage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [todaysClasses, setTodaysClasses] = useState([
    {
      id: 1,
      name: "Kids Training",
      time: "17:00 - 18:00",
      category: "kids",
      instructor: "Sensei Dimitris",
    },
    {
      id: 2,
      name: "Adult Training",
      time: "18:00 - 19:30",
      category: "adults",
      instructor: "Sensei Dimitris",
    },
  ])

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: 1,
      studentId: "TG001",
      studentName: "George Papadopoulos",
      classId: 2,
      className: "Adult Training",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    },
    {
      id: 2,
      studentId: "TG009",
      studentName: "Alex Petrov",
      classId: 1,
      className: "Kids Training",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    },
  ])

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const markAttendance = (recordId: number, status: "present" | "absent") => {
    setAttendanceRecords((prev) => prev.map((record) => (record.id === recordId ? { ...record, status } : record)))

    const record = attendanceRecords.find((r) => r.id === recordId)
    toast({
      title: "Attendance Marked",
      description: `${record?.studentName} marked as ${status} for ${record?.className}`,
    })
  }

  const isInstructor = currentUser?.category === "instructor"
  const isStudent = currentUser?.category !== "instructor"

  // Filter classes based on user category
  const userClasses = isStudent
    ? todaysClasses.filter((c) => c.category === currentUser?.category || c.category === "all")
    : todaysClasses

  const userAttendanceRecords = isStudent
    ? attendanceRecords.filter((r) => r.studentId === currentUser?.id)
    : attendanceRecords

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
        <p className="text-muted-foreground">
          {isInstructor ? "Manage student attendance for today's classes" : "Mark your attendance for today's training"}
        </p>
      </div>

      <div className="grid gap-4">
        {userClasses.map((classItem) => {
          const classRecords = userAttendanceRecords.filter((r) => r.classId === classItem.id)

          return (
            <Card key={classItem.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {classItem.name}
                      <Badge variant="outline" className="capitalize">
                        {classItem.category}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {classItem.time} - {classItem.instructor}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{classRecords.length} students</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isInstructor ? (
                  <div className="space-y-3">
                    {classRecords.length > 0 ? (
                      classRecords.map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <div className="font-medium">{record.studentName}</div>
                            <div className="text-sm text-muted-foreground">ID: {record.studentId}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {record.status === "pending" ? (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markAttendance(record.id, "present")}
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Present
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markAttendance(record.id, "absent")}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Absent
                                </Button>
                              </div>
                            ) : (
                              <Badge
                                variant={record.status === "present" ? "default" : "destructive"}
                                className="capitalize"
                              >
                                {record.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">No students registered for this class</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {classRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">Your Attendance</div>
                          <div className="text-sm text-muted-foreground">Today's {record.className}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {record.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => markAttendance(record.id, "present")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                I'll Attend
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAttendance(record.id, "absent")}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Can't Attend
                              </Button>
                            </div>
                          ) : (
                            <Badge
                              variant={record.status === "present" ? "default" : "destructive"}
                              className="capitalize"
                            >
                              {record.status === "present" ? "Attending" : "Not Attending"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

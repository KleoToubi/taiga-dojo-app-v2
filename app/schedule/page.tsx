"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Clock, User, Plus, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

type TrainingClass = {
  id: number
  day: string
  time: string
  instructor: string
  category: "adults" | "kids" | "all"
  focus: string
  description: string
  isActive: boolean
}

export default function SchedulePage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<TrainingClass | null>(null)

  // Mock data for classes
  const [classes, setClasses] = useState<TrainingClass[]>([
    {
      id: 1,
      day: "Monday",
      time: "17:00 - 18:00",
      instructor: "Sensei Dimitris",
      category: "kids",
      focus: "Basic Techniques",
      description: "Fundamental stances, blocks, and strikes for children",
      isActive: true,
    },
    {
      id: 2,
      day: "Monday",
      time: "18:00 - 19:30",
      instructor: "Sensei Dimitris",
      category: "adults",
      focus: "Kihon & Kata",
      description: "Practice of basic techniques and kata",
      isActive: true,
    },
    {
      id: 3,
      day: "Wednesday",
      time: "17:00 - 18:00",
      instructor: "Sensei Dimitris",
      category: "kids",
      focus: "Games & Conditioning",
      description: "Fun martial arts games and basic conditioning",
      isActive: true,
    },
    {
      id: 4,
      day: "Wednesday",
      time: "18:00 - 19:30",
      instructor: "Sensei Dimitris",
      category: "adults",
      focus: "Kumite & Conditioning",
      description: "Practice of kumite (sparring) and physical conditioning",
      isActive: true,
    },
    {
      id: 5,
      day: "Friday",
      time: "17:00 - 18:00",
      instructor: "Sensei Dimitris",
      category: "kids",
      focus: "Kata & Fun",
      description: "Kata practice with fun activities",
      isActive: true,
    },
    {
      id: 6,
      day: "Friday",
      time: "18:00 - 19:30",
      instructor: "Sensei Dimitris",
      category: "adults",
      focus: "Kata & Applications",
      description: "Practice of kata and their applications",
      isActive: true,
    },
  ])

  const [newClass, setNewClass] = useState<Partial<TrainingClass>>({
    day: "",
    time: "",
    instructor: "Sensei Dimitris",
    category: "adults",
    focus: "",
    description: "",
    isActive: true,
  })

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const isInstructor = currentUser?.category === "instructor"

  const handleAddClass = () => {
    if (!newClass.day || !newClass.time || !newClass.focus) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const classData: TrainingClass = {
      id: classes.length + 1,
      day: newClass.day!,
      time: newClass.time!,
      instructor: newClass.instructor!,
      category: newClass.category as "adults" | "kids" | "all",
      focus: newClass.focus!,
      description: newClass.description || "",
      isActive: true,
    }

    setClasses([...classes, classData])
    setNewClass({
      day: "",
      time: "",
      instructor: "Sensei Dimitris",
      category: "adults",
      focus: "",
      description: "",
      isActive: true,
    })
    setIsEditDialogOpen(false)

    toast({
      title: "Success",
      description: "Training class added successfully!",
    })
  }

  const handleEditClass = (classItem: TrainingClass) => {
    setEditingClass(classItem)
    setNewClass(classItem)
    setIsEditDialogOpen(true)
  }

  const handleUpdateClass = () => {
    if (!editingClass) return

    const updatedClasses = classes.map((c) =>
      c.id === editingClass.id
        ? {
            ...c,
            day: newClass.day!,
            time: newClass.time!,
            instructor: newClass.instructor!,
            category: newClass.category as "adults" | "kids" | "all",
            focus: newClass.focus!,
            description: newClass.description || "",
          }
        : c,
    )

    setClasses(updatedClasses)
    setEditingClass(null)
    setNewClass({
      day: "",
      time: "",
      instructor: "Sensei Dimitris",
      category: "adults",
      focus: "",
      description: "",
      isActive: true,
    })
    setIsEditDialogOpen(false)

    toast({
      title: "Success",
      description: "Training class updated successfully!",
    })
  }

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter((c) => c.id !== id))
    toast({
      title: "Success",
      description: "Training class deleted successfully!",
    })
  }

  const toggleClassStatus = (id: number) => {
    const updatedClasses = classes.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    setClasses(updatedClasses)
  }

  const adultClasses = classes.filter((c) => c.category === "adults" || c.category === "all")
  const kidClasses = classes.filter((c) => c.category === "kids" || c.category === "all")

  const ClassCard = ({ classItem }: { classItem: TrainingClass }) => (
    <Card className={`${!classItem.isActive ? "opacity-50" : ""}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {classItem.day}
              {!classItem.isActive && <Badge variant="secondary">Inactive</Badge>}
            </CardTitle>
            <CardDescription className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {classItem.time}
            </CardDescription>
          </div>
          {isInstructor && (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEditClass(classItem)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteClass(classItem.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{classItem.instructor}</span>
            </div>
            <div className="flex gap-2">
              <Badge variant={classItem.category === "kids" ? "secondary" : "default"}>{classItem.focus}</Badge>
              <Badge variant="outline" className="capitalize">
                {classItem.category}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{classItem.description}</p>
          {isInstructor && (
            <Button variant="outline" size="sm" onClick={() => toggleClassStatus(classItem.id)} className="w-full">
              {classItem.isActive ? "Deactivate" : "Activate"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("scheduleTitle")}</h1>
          <p className="text-muted-foreground">Weekly Kyokushin Karate training program by age category</p>
        </div>
        {isInstructor && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Training Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingClass ? "Edit Training Class" : "Add New Training Class"}</DialogTitle>
                <DialogDescription>Configure the training session details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">
                    Day*
                  </Label>
                  <Select value={newClass.day} onValueChange={(value) => setNewClass({ ...newClass, day: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time*
                  </Label>
                  <Input
                    id="time"
                    placeholder="e.g., 18:00 - 19:30"
                    value={newClass.time}
                    onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category*
                  </Label>
                  <Select
                    value={newClass.category}
                    onValueChange={(value) => setNewClass({ ...newClass, category: value as any })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kids">Kids (6-13 years)</SelectItem>
                      <SelectItem value="adults">Adults (14+ years)</SelectItem>
                      <SelectItem value="all">All Ages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="focus" className="text-right">
                    Focus*
                  </Label>
                  <Input
                    id="focus"
                    placeholder="e.g., Kihon & Kata"
                    value={newClass.focus}
                    onChange={(e) => setNewClass({ ...newClass, focus: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Class description..."
                    value={newClass.description}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editingClass ? handleUpdateClass : handleAddClass}>
                  {editingClass ? "Update" : "Add"} Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="adults" className="space-y-4">
        <TabsList>
          <TabsTrigger value="adults">Adults ({adultClasses.length})</TabsTrigger>
          <TabsTrigger value="kids">Kids ({kidClasses.length})</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="adults" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {adultClasses.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kids" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kidClasses.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important events and tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="font-medium">Belt Examinations</div>
                  <div className="text-sm text-muted-foreground">July 15, 2023 - 17:00</div>
                  <p className="mt-2 text-sm">
                    Examinations for promotion to the next belt. Minimum number of attendances required.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <div className="font-medium">Summer Camp</div>
                  <div className="text-sm text-muted-foreground">August 5-7, 2023</div>
                  <p className="mt-2 text-sm">Three-day intensive training with special guests from abroad.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

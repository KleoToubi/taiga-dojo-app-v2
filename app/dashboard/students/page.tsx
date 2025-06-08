"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { Search, Plus, MoreHorizontal, Edit, Eye, Trash2, Users, Baby } from "lucide-react"

// Mock data for students with age categories
const initialStudents = [
  {
    id: 1,
    studentId: "TG001",
    name: "George Papadopoulos",
    age: 25,
    category: "adult",
    belt: "orange",
    attendances: 28,
    registrationDate: "15/01/2023",
    email: "george@example.com",
    phone: "6912345678",
  },
  {
    id: 2,
    studentId: "TG002",
    name: "Maria Constantine",
    age: 32,
    category: "adult",
    belt: "orange",
    attendances: 45,
    registrationDate: "03/09/2022",
    email: "maria@example.com",
    phone: "6923456789",
  },
  {
    id: 3,
    studentId: "TG009",
    name: "Alex Petrov",
    age: 10,
    category: "kids",
    belt: "yellow",
    attendances: 22,
    registrationDate: "10/03/2023",
    email: "alex.parent@example.com",
    phone: "6934567890",
  },
  {
    id: 4,
    studentId: "TG010",
    name: "Emma Johnson",
    age: 8,
    category: "kids",
    belt: "orange",
    attendances: 18,
    registrationDate: "15/04/2023",
    email: "emma.parent@example.com",
    phone: "6945678901",
  },
  {
    id: 5,
    studentId: "TG003",
    name: "Nick Anthony",
    age: 28,
    category: "adult",
    belt: "white",
    attendances: 12,
    registrationDate: "22/03/2023",
    email: "nick@example.com",
    phone: "6956789012",
  },
  {
    id: 6,
    studentId: "TG011",
    name: "Lily Chen",
    age: 12,
    category: "kids",
    belt: "white",
    attendances: 8,
    registrationDate: "01/05/2023",
    email: "lily.parent@example.com",
    phone: "6967890123",
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    belt: "white",
  })
  const { toast } = useToast()
  const { t } = useLanguage()

  const generateStudentId = () => {
    const lastId = Math.max(...students.map((s) => Number.parseInt(s.studentId.replace("TG", ""))), 0)
    return `TG${String(lastId + 1).padStart(3, "0")}`
  }

  const adultStudents = students.filter((student) => student.category === "adult")
  const kidStudents = students.filter((student) => student.category === "kids")

  const filteredAdults = adultStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const filteredKids = kidStudents.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const age = Number.parseInt(newStudent.age)
    const category = age >= 14 ? "adult" : "kids"
    const currentDate = new Date()
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`

    const newStudentData = {
      id: students.length + 1,
      studentId: generateStudentId(),
      name: newStudent.name,
      age: age,
      category: category,
      email: newStudent.email,
      phone: newStudent.phone,
      belt: newStudent.belt,
      attendances: 0,
      registrationDate: formattedDate,
    }

    setStudents([...students, newStudentData])
    setNewStudent({
      name: "",
      age: "",
      email: "",
      phone: "",
      belt: "white",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Success",
      description: `Student ${newStudent.name} added successfully with ID: ${newStudentData.studentId}`,
    })
  }

  const handleDeleteStudent = (id: number) => {
    const studentToDelete = students.find((student) => student.id === id)
    if (!studentToDelete) return

    setStudents(students.filter((student) => student.id !== id))
    toast({
      title: "Delete Student",
      description: `Student ${studentToDelete.name} deleted successfully.`,
    })
  }

  const StudentTable = ({ studentList, category }: { studentList: any[]; category: string }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>{t("name")}</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>{t("belt")}</TableHead>
            <TableHead>{t("attendances")}</TableHead>
            <TableHead>{t("registrationDate")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentList.length > 0 ? (
            studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-mono font-medium">{student.studentId}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-6 rounded-sm belt-${student.belt}`}></div>
                    <span>{t(`belts.${student.belt}`)}</span>
                  </div>
                </TableCell>
                <TableCell>{student.attendances}</TableCell>
                <TableCell>{student.registrationDate}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">{t("actions")}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        {t("view")}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        {t("edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t("delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                No {category} students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("studentsTitle")}</h1>
          <p className="text-muted-foreground">Manage students by age category</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("newStudent")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("addNewStudent")}</DialogTitle>
              <DialogDescription>
                Fill in the new student details. Category will be auto-assigned based on age.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t("name")}*
                </Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age*
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="6"
                  max="80"
                  value={newStudent.age}
                  onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  {t("email")}*
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  {t("phone")}
                </Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="belt" className="text-right">
                  {t("belt")}
                </Label>
                <Select
                  value={newStudent.belt}
                  onValueChange={(value) => setNewStudent({ ...newStudent, belt: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select belt" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">{t("belts.white")}</SelectItem>
                    <SelectItem value="yellow">{t("belts.yellow")}</SelectItem>
                    <SelectItem value="orange">{t("belts.orange")}</SelectItem>
                    <SelectItem value="green">{t("belts.green")}</SelectItem>
                    <SelectItem value="blue">{t("belts.blue")}</SelectItem>
                    <SelectItem value="brown">{t("belts.brown")}</SelectItem>
                    <SelectItem value="black">{t("belts.black")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newStudent.age && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Category</Label>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    {Number.parseInt(newStudent.age) >= 14 ? "Adult (14+ years)" : "Kids (6-13 years)"}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={handleAddStudent}>{t("add")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`${t("search")} student...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="adults" className="space-y-4">
        <TabsList>
          <TabsTrigger value="adults" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Adults ({adultStudents.length})
          </TabsTrigger>
          <TabsTrigger value="kids" className="flex items-center gap-2">
            <Baby className="h-4 w-4" />
            Kids ({kidStudents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="adults">
          <StudentTable studentList={filteredAdults} category="adult" />
        </TabsContent>

        <TabsContent value="kids">
          <StudentTable studentList={filteredKids} category="kids" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

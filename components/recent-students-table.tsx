"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

// Mock data for students
const students = [
  {
    id: 1,
    name: "George Papadopoulos",
    belt: "yellow",
    attendances: 28,
    registrationDate: "15/01/2023",
  },
  {
    id: 2,
    name: "Maria Constantine",
    belt: "orange",
    attendances: 45,
    registrationDate: "03/09/2022",
  },
  {
    id: 3,
    name: "Nick Anthony",
    belt: "white",
    attendances: 12,
    registrationDate: "22/03/2023",
  },
  {
    id: 4,
    name: "Helen Dimitriou",
    belt: "green",
    attendances: 67,
    registrationDate: "10/05/2022",
  },
  {
    id: 5,
    name: "Kostas Papandreou",
    belt: "yellow",
    attendances: 32,
    registrationDate: "08/02/2023",
  },
]

export function RecentStudentsTable() {
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleViewStudent = (id: number) => {
    toast({
      title: "View Student",
      description: `Viewing student profile with ID: ${id}`,
    })
  }

  const handleEditStudent = (id: number) => {
    toast({
      title: "Edit Student",
      description: `Editing student profile with ID: ${id}`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("belt")}</TableHead>
            <TableHead>{t("attendances")}</TableHead>
            <TableHead>{t("registrationDate")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-6 rounded-sm belt-${student.belt}`}></div>
                  <span>{t(`belts.${student.belt}`)}</span>
                </div>
              </TableCell>
              <TableCell>{student.attendances}</TableCell>
              <TableCell>{student.registrationDate}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleViewStudent(student.id)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEditStudent(student.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import { useState } from "react"
<<<<<<< HEAD
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function HomePage() {
  const [studentId, setStudentId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20">
              <Image src="/images/taiga-logo.png" alt="Taiga Dojo Logo" width={80} height={80} />
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
=======
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function SettingsPage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "Sensei Dimitris",
    email: "dimitris@taigadojo.com",
    bio: "Kyokushin Karate instructor with 20+ years of experience.",
  })

  function onSubmit() {
    setIsLoading(true)

    setTimeout(() => {
      toast({
        title: t("settingsSaved"),
        description: t("profileChangesSaved"),
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("settingsTitle")}</h1>
        <p className="text-muted-foreground">{t("settingsSubtitle")}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("appearance")}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile")}</CardTitle>
              <CardDescription>Manage your profile information that will be displayed to students.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onSubmit} disabled={isLoading}>
                {isLoading ? t("loading") : t("save")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("notifications")}</CardTitle>
              <CardDescription>Configure your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="new-students">New students</Label>
                <Switch id="new-students" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="attendance">Attendance</Label>
                <Switch id="attendance" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="events">Events</Label>
                <Switch id="events" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing">Marketing updates</Label>
                <Switch id="marketing" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  toast({
                    title: t("settingsSaved"),
                    description: "Notification preferences saved successfully.",
                  })
                }}
              >
                {t("save")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{t("appearance")}</CardTitle>
              <CardDescription>Customize the appearance of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="flex-1">
                    Light
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Dark
                  </Button>
                  <Button variant="outline" className="flex-1">
                    System
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("language")}</Label>
                <div className="flex items-center space-x-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  toast({
                    title: t("settingsSaved"),
                    description: "Appearance settings saved successfully.",
                  })
                }}
              >
                {t("save")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
>>>>>>> c9fe30550c3a62256f8582dada57c1b844eb0af0
    </div>
  )
}

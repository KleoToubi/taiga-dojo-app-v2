"use client"

import { useState } from "react"
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
    </div>
  )
}

"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useLanguage } from "../contexts/language-context"
import { InstructorDashboard } from "../components/InstructorDashboard"
import { StudentDashboard } from "../components/StudentDashboard"
import { Button } from "../components/ui/Button"

export default function DashboardScreen() {
  const [userRole, setUserRole] = useState<"instructor" | "student">("instructor")
  const { t } = useLanguage()

  const toggleRole = () => {
    const newRole = userRole === "instructor" ? "student" : "instructor"
    setUserRole(newRole)
    // In a real app, you would store this in AsyncStorage
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {userRole === "instructor" ? t("dashboardTitle") : t("studentDashboardTitle")}
          </Text>
          <Text style={styles.subtitle}>
            {userRole === "instructor" ? t("dashboardSubtitle") : t("studentDashboardSubtitle")}
          </Text>
        </View>
        <Button
          title={`Switch to ${userRole === "instructor" ? "Student" : "Instructor"}`}
          onPress={toggleRole}
          variant="outline"
        />
      </View>

      {userRole === "instructor" ? <InstructorDashboard /> : <StudentDashboard />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
})

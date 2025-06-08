"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useLanguage } from "@/contexts/language-context"

export function AttendanceChart() {
  const { t } = useLanguage()

  // Mock data for attendance chart
  const data = [
    {
      name: t("monday").slice(0, 3),
      total: 32,
    },
    {
      name: t("tuesday").slice(0, 3),
      total: 0,
    },
    {
      name: t("wednesday").slice(0, 3),
      total: 28,
    },
    {
      name: t("thursday").slice(0, 3),
      total: 0,
    },
    {
      name: t("friday").slice(0, 3),
      total: 34,
    },
    {
      name: t("saturday").slice(0, 3),
      total: 0,
    },
    {
      name: t("sunday").slice(0, 3),
      total: 0,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

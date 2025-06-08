"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Home,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Bell,
  ClipboardCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function SimpleSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout

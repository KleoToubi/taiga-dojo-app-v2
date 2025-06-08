"use client"

import * as React from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const toast = React.useCallback(({ title, description, variant = "default" }: ToastProps) => {
    // Simple console log for demo - in real app you'd use a proper toast library
    console.log(`Toast: ${title} - ${description} (${variant})`)
  }, [])

  return { toast }
}

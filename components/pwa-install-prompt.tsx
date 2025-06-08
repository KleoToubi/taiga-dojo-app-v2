"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download } from "lucide-react"

export function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the install prompt
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    // Hide the prompt
    setShowPrompt(false)

    // Show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt")
        } else {
          console.log("User dismissed the install prompt")
        }
        // Clear the deferredPrompt
        setDeferredPrompt(null)
      })
    }
  }

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Install Taiga Dojo App</DialogTitle>
          <DialogDescription>
            Install this application on your home screen for quick and easy access when you're on the go.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <img src="/images/taiga-logo.png" alt="Taiga Dojo Logo" className="w-24 h-24" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowPrompt(false)}>
            Not now
          </Button>
          <Button onClick={handleInstallClick}>
            <Download className="mr-2 h-4 w-4" />
            Install App
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

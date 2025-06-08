"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizontal, Bot, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
}

export default function AssistantPage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: t("aiGreeting"),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    // Belt requirements
    if (
      lowerInput.includes("belt") ||
      lowerInput.includes("requirement") ||
      lowerInput.includes("grade") ||
      lowerInput.includes("kyu") ||
      lowerInput.includes("dan")
    ) {
      return t("beltResponse")
    }

    // Schedule
    if (
      lowerInput.includes("schedule") ||
      lowerInput.includes("training") ||
      lowerInput.includes("class") ||
      lowerInput.includes("time") ||
      lowerInput.includes("when")
    ) {
      return t("scheduleResponse")
    }

    // Philosophy
    if (
      lowerInput.includes("philosophy") ||
      lowerInput.includes("kyokushin") ||
      lowerInput.includes("meaning") ||
      lowerInput.includes("kanku") ||
      lowerInput.includes("principle")
    ) {
      return t("philosophyResponse")
    }

    // Exams
    if (
      lowerInput.includes("exam") ||
      lowerInput.includes("test") ||
      lowerInput.includes("grading") ||
      lowerInput.includes("promotion")
    ) {
      return t("examsResponse")
    }

    // Techniques
    if (
      lowerInput.includes("technique") ||
      lowerInput.includes("strike") ||
      lowerInput.includes("kick") ||
      lowerInput.includes("block") ||
      lowerInput.includes("stance") ||
      lowerInput.includes("tsuki") ||
      lowerInput.includes("geri") ||
      lowerInput.includes("uke") ||
      lowerInput.includes("dachi")
    ) {
      return t("techniqueResponse")
    }

    // Etiquette
    if (
      lowerInput.includes("etiquette") ||
      lowerInput.includes("rule") ||
      lowerInput.includes("bow") ||
      lowerInput.includes("osu") ||
      lowerInput.includes("respect") ||
      lowerInput.includes("dojo")
    ) {
      return t("etiquetteResponse")
    }

    // Kata
    if (
      lowerInput.includes("kata") ||
      lowerInput.includes("form") ||
      lowerInput.includes("taikyoku") ||
      lowerInput.includes("pinan") ||
      lowerInput.includes("sanchin") ||
      lowerInput.includes("tensho")
    ) {
      return t("kataResponse")
    }

    // Default response
    return "I can help you with questions about:\n\n• Belt requirements and grading\n• Training schedule\n• Kyokushin philosophy and history\n• Techniques (strikes, kicks, blocks, stances)\n• Kata (forms)\n• Dojo etiquette and rules\n• Examinations and promotions\n\nWhat would you like to know about?"
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const responseContent = getAIResponse(currentInput)

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: responseContent,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("assistantTitle")}</h1>
        <p className="text-muted-foreground">{t("assistantSubtitle")}</p>
      </div>

      <Card className="h-[calc(100vh-12rem)]">
        <CardHeader>
          <CardTitle>{t("chatWithAssistant")}</CardTitle>
          <CardDescription>{t("askAbout")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-22rem)] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <Avatar className={message.role === "assistant" ? "bg-primary" : "bg-muted"}>
                      <AvatarFallback>
                        {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "assistant"
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="bg-primary">
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-75"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              placeholder={t("typeMessage")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <SendHorizontal className="h-4 w-4" />
              <span className="sr-only">{t("send")}</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

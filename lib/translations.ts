export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    students: "Students",
    schedule: "Schedule",
    assistant: "AI Assistant",
    settings: "Settings",
    myProgress: "My Progress",
    logout: "Logout",
    switchRole: "Switch Role",

    // Common
    name: "Name",
    email: "Email",
    phone: "Phone",
    belt: "Belt",
    attendances: "Attendances",
    registrationDate: "Registration Date",
    actions: "Actions",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    view: "View",
    delete: "Delete",
    add: "Add",
    search: "Search",
    loading: "Loading...",

    // Belt colors
    belts: {
      white: "White",
      orange: "Orange",
      blue: "Blue",
      yellow: "Yellow",
      green: "Green",
      brown: "Brown",
      black: "Black",
    },

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "School and student management",
    studentDashboardTitle: "My Progress",
    studentDashboardSubtitle: "Track your progress and training",
    totalStudents: "Total Students",
    todayAttendance: "Today's Attendance",
    nextExams: "Next Exams",
    averageAttendance: "Average Attendance",
    recentStudents: "Recent Students",
    upcomingClasses: "Upcoming Classes",
    attendancePerWeek: "Attendance per Week",
    reports: "Reports",

    // Students
    studentsTitle: "Students",
    studentsSubtitle: "Manage and track students",
    newStudent: "New Student",
    addNewStudent: "Add New Student",
    fillStudentDetails: "Fill in the new student details",
    studentAdded: "Student added successfully",
    studentDeleted: "Student deleted successfully",
    noStudentsFound: "No students found with these criteria",

    // Schedule
    scheduleTitle: "Training Schedule",
    scheduleSubtitle: "Weekly Kyokushin Karate training program",
    weekly: "Weekly",
    monthly: "Monthly",
    events: "Events",
    instructor: "Instructor",
    focus: "Focus",
    description: "Description",
    upcomingEvents: "Upcoming Events",

    // Training days and times
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",

    // Training focus areas
    kinonKata: "Kihon & Kata",
    kumiteConditioning: "Kumite & Conditioning",
    kataApplications: "Kata & Applications",

    // AI Assistant
    assistantTitle: "AI Assistant",
    assistantSubtitle: "Ask anything about Taiga Dojo and Kyokushin Karate",
    chatWithAssistant: "Chat with AI Assistant",
    askAbout: "Ask about schedule, belt requirements, Kyokushin philosophy, techniques, or exams",
    typeMessage: "Type your message...",
    send: "Send",

    // Settings
    settingsTitle: "Settings",
    settingsSubtitle: "Manage your account settings",
    profile: "Profile",
    notifications: "Notifications",
    appearance: "Appearance",
    language: "Language",

    // Belt requirements
    currentBelt: "Current Belt",
    nextBelt: "Next Belt",
    nextTraining: "Next Training",
    beltRequirements: "Belt Requirements",
    requiredTechniques: "Required techniques and attendances",
    techniques: "Techniques",
    exercises: "Exercises",
    kumite: "Kumite",
    timeLimit: "Time Limit",

    // Company info
    companyName: "Taiga Dojo",
    companySubtitle: "Kyokushin Karate",
    senseiName: "Sensei Dimitris",
    studentName: "Student George",

    // Messages
    switchedToRole: "Switched to {role} view",
    settingsSaved: "Settings saved successfully",
    profileChangesSaved: "Profile changes saved successfully",

    // AI Responses
    aiGreeting:
      "Hello! I'm the Taiga Dojo AI assistant. How can I help you today? I can answer questions about belt requirements, techniques, kata, dojo etiquette, Kyokushin philosophy, training schedule, or exams.",

    beltResponse:
      "Here are the belt requirements for Kyokushin Karate at Taiga Dojo:\n\n**Time Requirements:**\n• 10th Kyu to 3rd Kyu: 3 months between gradings\n• 3rd Kyu to 1st Kyu: 6 months between gradings\n• 1st Kyu to Shodan: Minimum 1 year (3+ years total training)\n• Shodan to Nidan: Minimum 2 years (must be 18+)\n\n**General Requirements:**\n• Required number of attendances\n• Knowledge of all techniques for your belt\n• Pass practical and theoretical examination\n• Demonstrate proper dojo etiquette\n\nWould you like specific requirements for a particular belt level?",

    scheduleResponse:
      "**Taiga Dojo Training Schedule:**\n\n🥋 **Monday: 18:00-19:30**\n*Kihon & Kata*\nBasic techniques and formal exercises\n\n🥋 **Wednesday: 18:00-19:30**\n*Kumite & Conditioning*\nSparring practice and physical conditioning\n\n🥋 **Friday: 18:00-19:30**\n*Kata & Applications*\nFormal exercises and practical applications\n\n**Please arrive 10 minutes early for warm-up.**\n\n*Remember: Consistent attendance is required for belt progression!*",

    philosophyResponse:
      "**Kyokushin Philosophy & Meaning:**\n\n**KYOKUSHINKAI:**\n• KYOKU = Ultimate\n• SHIN = Truth or Reality  \n• KAI = To meet, join, associate\n\n**The Kanku Symbol:**\nOur symbol is derived from the Kanku Kata (sky gazing form):\n• Points represent fingers → ultimates/peaks\n• Thick sections represent wrists → power\n• Center represents infinity → depth\n• Circle represents continuity and circular action\n\n**Core Principles:**\n• Self-discipline and perseverance\n• Respect for others\n• Continuous self-improvement\n• Physical and mental strength\n• 'OSU!' - patience and perseverance under pressure",

    examsResponse:
      "**Belt Examinations at Taiga Dojo:**\n\n**Examination Schedule:**\n• Lower grades (10th-3rd Kyu): Every 3 months\n• Higher grades (3rd-1st Kyu): Every 6 months\n• Black belt gradings: Annual or bi-annual\n\n**Requirements:**\n• Minimum attendance requirements met\n• Instructor recommendation\n• Knowledge of all required techniques\n• Demonstration of kata\n• Physical fitness test\n• Understanding of Kyokushin principles\n\n**From 2nd Kyu (Brown Belt) upwards:**\nGradings are held as 'General' gradings by Chief & Senior Instructors, requiring a letter of recommendation from your instructor.\n\n**Black Belt (1st Dan) includes:**\n• Tameshiwari (board breaking) - 2 boards\n• 25 rounds of kumite\n• Advanced kata demonstration",

    techniqueResponse:
      "**Kyokushin Techniques by Category:**\n\n**Basic Stances (Dachi):**\n• Fudo Dachi - Formal stance\n• Zenkutsu Dachi - Forward leaning\n• Sanchin Dachi - Three-point stance\n• Kiba Dachi - Horse riding stance\n\n**Strikes (Tsuki/Uchi):**\n• Seiken Tsuki - Closed fist punch\n• Uraken Uchi - Back knuckle strike\n• Shuto Uchi - Knife hand strike\n• Tettsui Uchi - Hammer fist strike\n\n**Blocks (Uke):**\n• Jodan Uke - Upper block\n• Chudan Uke - Middle block\n• Gedan Barai - Lower block/sweep\n\n**Kicks (Geri):**\n• Mae Geri - Front kick\n• Yoko Geri - Side kick\n• Mawashi Geri - Roundhouse kick\n• Ushiro Geri - Back kick\n\nWhich specific technique would you like to know more about?",

    etiquetteResponse:
      "**Dojo Etiquette & Procedures:**\n\n**Entering/Leaving:**\n• Face instructor's position and say 'OSU!' loudly\n• Bow respectfully\n\n**Forms of Address:**\n• Chief Instructor: 'Shihan'\n• Instructors: 'Sensei' (3rd-4th Dan) or 'Senpai'\n• Senior students: 'Senpai'\n\n**Training Rules:**\n• No talking during training\n• Sit in 'Seiza' position when told\n• Keep gi clean and properly tied\n• Short nails, clean hair (tied back if long)\n• No eating, drinking, or smoking in dojo\n\n**Class Protocol:**\n• Line up by grade order\n• Follow formal opening/closing ceremonies\n• 'Mokuso' (meditation) at start/end\n• Bow to instructors and fellow students\n\n**Late Arrival:**\n• Enter quietly, bow, kneel in Seiza\n• Wait for permission to join class",

    kataResponse:
      "**Kata (Forms) in Kyokushin Curriculum:**\n\n**Beginner Kata:**\n• Taikyoku Sono Ichi, Ni, San - Basic forms\n• Gekisai Dai/Sho - Destruction forms\n\n**Intermediate Kata:**\n• Pinan Sono Ichi through Go - Peaceful mind forms\n• Sanchin - Three battles (with Ibuki breathing)\n• Yantsu - Swallow form\n• Tsuki No Kata - Punching form\n\n**Advanced Kata:**\n• Tensho - Rotating palms\n• Saifa - Smash and tear\n• Seienchin - Storm within calm\n• Kanku Dai - Sky gazing\n• Sushiho - 54 steps\n• Garyu - Reclining dragon\n\n**Traditional Kata:**\n• Bassai Dai - Fortress storm\n• Seipai - 18 hands\n• Sokugi Taikyoku - Kicking forms\n\nEach kata teaches specific principles, techniques, and breathing methods essential to Kyokushin development.",
  },
  de: {
    // Navigation
    dashboard: "Dashboard",
    students: "Schüler",
    schedule: "Stundenplan",
    assistant: "KI-Assistent",
    settings: "Einstellungen",
    myProgress: "Mein Fortschritt",
    logout: "Abmelden",
    switchRole: "Rolle wechseln",

    // Common
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    belt: "Gürtel",
    attendances: "Anwesenheiten",
    registrationDate: "Anmeldedatum",
    actions: "Aktionen",
    save: "Speichern",
    cancel: "Abbrechen",
    edit: "Bearbeiten",
    view: "Anzeigen",
    delete: "Löschen",
    add: "Hinzufügen",
    search: "Suchen",
    loading: "Laden...",

    // Belt colors
    belts: {
      white: "Weiß",
      orange: "Orange",
      blue: "Blau",
      yellow: "Gelb",
      green: "Grün",
      brown: "Braun",
      black: "Schwarz",
    },

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Schul- und Schülerverwaltung",
    studentDashboardTitle: "Mein Fortschritt",
    studentDashboardSubtitle: "Verfolgen Sie Ihren Fortschritt und Ihr Training",
    totalStudents: "Schüler insgesamt",
    todayAttendance: "Heutige Anwesenheit",
    nextExams: "Nächste Prüfungen",
    averageAttendance: "Durchschnittliche Anwesenheit",
    recentStudents: "Aktuelle Schüler",
    upcomingClasses: "Kommende Kurse",
    attendancePerWeek: "Anwesenheit pro Woche",
    reports: "Berichte",

    // Students
    studentsTitle: "Schüler",
    studentsSubtitle: "Schüler verwalten und verfolgen",
    newStudent: "Neuer Schüler",
    addNewStudent: "Neuen Schüler hinzufügen",
    fillStudentDetails: "Geben Sie die Details des neuen Schülers ein",
    studentAdded: "Schüler erfolgreich hinzugefügt",
    studentDeleted: "Schüler erfolgreich gelöscht",
    noStudentsFound: "Keine Schüler mit diesen Kriterien gefunden",

    // Schedule
    scheduleTitle: "Trainingsplan",
    scheduleSubtitle: "Wöchentliches Kyokushin Karate Trainingsprogramm",
    weekly: "Wöchentlich",
    monthly: "Monatlich",
    events: "Veranstaltungen",
    instructor: "Lehrer",
    focus: "Schwerpunkt",
    description: "Beschreibung",
    upcomingEvents: "Kommende Veranstaltungen",

    // Training days and times
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",

    // Training focus areas
    kinonKata: "Kihon & Kata",
    kumiteConditioning: "Kumite & Kondition",
    kataApplications: "Kata & Anwendungen",

    // AI Assistant
    assistantTitle: "KI-Assistent",
    assistantSubtitle: "Fragen Sie alles über Taiga Dojo und Kyokushin Karate",
    chatWithAssistant: "Chat mit KI-Assistent",
    askAbout: "Fragen Sie nach Stundenplan, Gürtelanforderungen, Kyokushin-Philosophie, Techniken oder Prüfungen",
    typeMessage: "Geben Sie Ihre Nachricht ein...",
    send: "Senden",

    // Settings
    settingsTitle: "Einstellungen",
    settingsSubtitle: "Verwalten Sie Ihre Kontoeinstellungen",
    profile: "Profil",
    notifications: "Benachrichtigungen",
    appearance: "Erscheinungsbild",
    language: "Sprache",

    // Belt requirements
    currentBelt: "Aktueller Gürtel",
    nextBelt: "Nächster Gürtel",
    nextTraining: "Nächstes Training",
    beltRequirements: "Gürtelanforderungen",
    requiredTechniques: "Erforderliche Techniken und Anwesenheiten",
    techniques: "Techniken",
    exercises: "Übungen",
    kumite: "Kumite",
    timeLimit: "Zeitlimit",

    // Company info
    companyName: "Taiga Dojo",
    companySubtitle: "Kyokushin Karate",
    senseiName: "Sensei Dimitris",
    studentName: "Schüler Georg",

    // Messages
    switchedToRole: "Zu {role}-Ansicht gewechselt",
    settingsSaved: "Einstellungen erfolgreich gespeichert",
    profileChangesSaved: "Profiländerungen erfolgreich gespeichert",

    // AI Responses
    aiGreeting:
      "Hallo! Ich bin der Taiga Dojo KI-Assistent. Wie kann ich Ihnen heute helfen? Ich kann Fragen zu Gürtelanforderungen, Techniken, Kata, Dojo-Etikette, Kyokushin-Philosophie, Trainingsplan oder Prüfungen beantworten.",

    beltResponse:
      "Hier sind die Gürtelanforderungen für Kyokushin Karate im Taiga Dojo:\n\n**Zeitanforderungen:**\n• 10. Kyu bis 3. Kyu: 3 Monate zwischen Prüfungen\n• 3. Kyu bis 1. Kyu: 6 Monate zwischen Prüfungen\n• 1. Kyu bis Shodan: Mindestens 1 Jahr (3+ Jahre Gesamttraining)\n• Shodan bis Nidan: Mindestens 2 Jahre (muss 18+ sein)\n\n**Allgemeine Anforderungen:**\n• Erforderliche Anzahl von Anwesenheiten\n• Kenntnis aller Techniken für Ihren Gürtel\n• Bestehen der praktischen und theoretischen Prüfung\n• Demonstration der richtigen Dojo-Etikette\n\nMöchten Sie spezifische Anforderungen für eine bestimmte Gürtelstufe?",

    scheduleResponse:
      "**Taiga Dojo Trainingsplan:**\n\n🥋 **Montag: 18:00-19:30**\n*Kihon & Kata*\nGrundtechniken und formale Übungen\n\n🥋 **Mittwoch: 18:00-19:30**\n*Kumite & Kondition*\nKampfpraxis und körperliche Konditionierung\n\n🥋 **Freitag: 18:00-19:30**\n*Kata & Anwendungen*\nFormale Übungen und praktische Anwendungen\n\n**Bitte kommen Sie 10 Minuten früher zum Aufwärmen.**\n\n*Denken Sie daran: Regelmäßige Anwesenheit ist für den Gürtelfortschritt erforderlich!*",

    philosophyResponse:
      "**Kyokushin Philosophie & Bedeutung:**\n\n**KYOKUSHINKAI:**\n• KYOKU = Ultimativ\n• SHIN = Wahrheit oder Realität\n• KAI = Treffen, verbinden, assoziieren\n\n**Das Kanku-Symbol:**\nUnser Symbol stammt aus der Kanku Kata (Himmel betrachtende Form):\n• Punkte repräsentieren Finger → Ultimatives/Gipfel\n• Dicke Abschnitte repräsentieren Handgelenke → Kraft\n• Zentrum repräsentiert Unendlichkeit → Tiefe\n• Kreis repräsentiert Kontinuität und kreisförmige Aktion\n\n**Kernprinzipien:**\n• Selbstdisziplin und Ausdauer\n• Respekt vor anderen\n• Kontinuierliche Selbstverbesserung\n• Körperliche und geistige Stärke\n• 'OSU!' - Geduld und Ausdauer unter Druck",

    examsResponse:
      "**Gürtelprüfungen im Taiga Dojo:**\n\n**Prüfungsplan:**\n• Niedrigere Grade (10.-3. Kyu): Alle 3 Monate\n• Höhere Grade (3.-1. Kyu): Alle 6 Monate\n• Schwarzgurt-Prüfungen: Jährlich oder halbjährlich\n\n**Anforderungen:**\n• Mindestanwesenheitsanforderungen erfüllt\n• Empfehlung des Lehrers\n• Kenntnis aller erforderlichen Techniken\n• Demonstration von Kata\n• Körperlicher Fitnesstest\n• Verständnis der Kyokushin-Prinzipien\n\n**Ab 2. Kyu (Brauner Gürtel) aufwärts:**\nPrüfungen werden als 'Allgemeine' Prüfungen von Haupt- und Senior-Lehrern abgehalten und erfordern ein Empfehlungsschreiben Ihres Lehrers.\n\n**Schwarzgurt (1. Dan) beinhaltet:**\n• Tameshiwari (Brettbrechen) - 2 Bretter\n• 25 Runden Kumite\n• Fortgeschrittene Kata-Demonstration",

    techniqueResponse:
      "**Kyokushin Techniken nach Kategorien:**\n\n**Grundstellungen (Dachi):**\n• Fudo Dachi - Formale Stellung\n• Zenkutsu Dachi - Vorwärts gelehnt\n• Sanchin Dachi - Drei-Punkt-Stellung\n• Kiba Dachi - Reitstellung\n\n**Schläge (Tsuki/Uchi):**\n• Seiken Tsuki - Faustschlag\n• Uraken Uchi - Rückhandschlag\n• Shuto Uchi - Handkantenschlag\n• Tettsui Uchi - Hammerfaustschlag\n\n**Blöcke (Uke):**\n• Jodan Uke - Oberer Block\n• Chudan Uke - Mittlerer Block\n• Gedan Barai - Unterer Block/Fegen\n\n**Tritte (Geri):**\n• Mae Geri - Fronttritt\n• Yoko Geri - Seitentritt\n• Mawashi Geri - Rundtritt\n• Ushiro Geri - Rücktritt\n\nÜber welche spezifische Technik möchten Sie mehr erfahren?",

    etiquetteResponse:
      "**Dojo-Etikette & Verfahren:**\n\n**Betreten/Verlassen:**\n• Zur Position des Lehrers wenden und laut 'OSU!' sagen\n• Respektvoll verbeugen\n\n**Anredeformen:**\n• Hauptlehrer: 'Shihan'\n• Lehrer: 'Sensei' (3.-4. Dan) oder 'Senpai'\n• Ältere Schüler: 'Senpai'\n\n**Trainingsregeln:**\n• Kein Sprechen während des Trainings\n• In 'Seiza'-Position sitzen wenn angewiesen\n• Gi sauber und richtig gebunden halten\n• Kurze Nägel, saubere Haare (zurückgebunden wenn lang)\n• Kein Essen, Trinken oder Rauchen im Dojo\n\n**Klassenprotokoll:**\n• Nach Gradordnung aufstellen\n• Formelle Eröffnungs-/Abschlusszeremonien befolgen\n• 'Mokuso' (Meditation) am Anfang/Ende\n• Vor Lehrern und Mitschülern verbeugen\n\n**Verspätete Ankunft:**\n• Leise eintreten, verbeugen, in Seiza knien\n• Auf Erlaubnis warten, der Klasse beizutreten",

    kataResponse:
      "**Kata (Formen) im Kyokushin Lehrplan:**\n\n**Anfänger Kata:**\n• Taikyoku Sono Ichi, Ni, San - Grundformen\n• Gekisai Dai/Sho - Zerstörungsformen\n\n**Mittelstufe Kata:**\n• Pinan Sono Ichi bis Go - Friedlicher Geist Formen\n• Sanchin - Drei Kämpfe (mit Ibuki-Atmung)\n• Yantsu - Schwalbenform\n• Tsuki No Kata - Schlagform\n\n**Fortgeschrittene Kata:**\n• Tensho - Rotierende Handflächen\n• Saifa - Zertrümmern und reißen\n• Seienchin - Sturm in der Ruhe\n• Kanku Dai - Himmel betrachten\n• Sushiho - 54 Schritte\n• Garyu - Liegender Drache\n\n**Traditionelle Kata:**\n• Bassai Dai - Festungssturm\n• Seipai - 18 Hände\n• Sokugi Taikyoku - Trittformen\n\nJede Kata lehrt spezifische Prinzipien, Techniken und Atmungsmethoden, die für die Kyokushin-Entwicklung wesentlich sind.",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

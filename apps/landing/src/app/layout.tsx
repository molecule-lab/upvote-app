import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Upzy - Simple Feature Request Management",
  description: "Collect, prioritize, and manage feature requests from your users with Upzy's simple, embeddable voting board.",
  keywords: ["feature requests", "user feedback", "product management", "voting", "prioritization"],
  authors: [{ name: "Upzy Team" }],
  openGraph: {
    title: "Upzy - Simple Feature Request Management",
    description: "Collect, prioritize, and manage feature requests from your users with Upzy's simple, embeddable voting board.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upzy - Simple Feature Request Management",
    description: "Collect, prioritize, and manage feature requests from your users with Upzy's simple, embeddable voting board.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 
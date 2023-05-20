import "./globals.css";
import BlogLayout from './BlogLayout'
import { getNavigation, } from "./ghost-client"
import { use } from "react"
import type { Settings } from "@tryghost/content-api"

interface UpdateSettings extends Settings {
  accent_color?: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const settings: UpdateSettings = use(getNavigation())

  return (

    <html className='light' lang="en">

      <body>

        <BlogLayout setting={settings}>

          {children}

        </BlogLayout>

      </body>

    </html>

  )
}
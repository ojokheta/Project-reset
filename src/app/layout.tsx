import type { Metadata } from 'next'
import './globals.css'
import { BottomNav } from './_components/BottomNav'
import { TopNav } from './_components/TopNav'
import { AmbientBackground } from './_components/AmbientBackground'
import { ScrollFx } from './_components/ScrollFx'

export const metadata: Metadata = {
  title: 'Project RESET | University of Ibadan — Addiction & Substance Abuse Prevention',
  description: 'PROJECT RESET is a long-term, student-led movement for addiction and substance-abuse prevention, early support, advocacy, peer education, referral linkage and recovery-friendly communities — originating at the University of Ibadan in partnership with the CDCC, Student Affairs Division.',
  keywords: 'Project RESET, University of Ibadan, substance abuse prevention, addiction support, CDCC, student mental health, peer support, Nigeria',
  icons: { icon: '/favicon.png' },
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AmbientBackground /><TopNav />{children}<BottomNav /><ScrollFx /></body></html> }

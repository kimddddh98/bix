import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/providers/QueryProvider'
import { cookies } from 'next/headers'
import HydrationToken from '@/hooks/HydrationToken'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '빅스페이먼츠',
  description: '빅스페이먼츠 프론트엔드 과제 사이트입니다.',
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')
  console.log(accessToken)

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <HydrationToken accessToken={accessToken?.value ?? null} /> */}
        <QueryProvider>
          {children} {modal}
        </QueryProvider>
      </body>
    </html>
  )
}

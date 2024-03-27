import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from '@/components/molecules/page-header';
import NoteProvider from '@/providers/note-provider';
import { readNotes } from '@/utils/server-actions';
import NotificationProvider from '@/providers/notification-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes.app",
  description: "Manage notes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <NoteProvider notes={await readNotes()}>
            <PageHeader />
            <div className='relative top-16'>
              {children}
            </div>
          </NoteProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shabeer | Full Stack & React Native Developer",
  description:
    "Experienced Full Stack Developer specializing in Next.js, React Native, and backend technologies like Node.js, PHP, and MySQL. Passionate about building high-performance applications with modern web and mobile frameworks.",
  keywords: [
    "Full Stack Developer",
    "React Native",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Prisma",
    "Expo",
    "TypeScript",
    "Tailwind CSS",
    "Web Development",
    "Mobile App Development",
  ],
  author: "Shabeer",
  generator: "Next.js",
  applicationName: "Shabeer Portfolio",
  robots: "index, follow",
  
  
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary text-white`}
      >
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}

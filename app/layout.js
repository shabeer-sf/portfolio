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
  // openGraph: {
  //   title: "Shabeer | Full Stack & React Native Developer",
  //   description:
  //     "Experienced Full Stack Developer specializing in Next.js, React Native, and backend technologies like Node.js, PHP, and MySQL. Passionate about building high-performance applications with modern web and mobile frameworks.",
  //   url: "https://yourportfolio.com", // Replace with your actual portfolio URL
  //   type: "website",
  //   locale: "en_US",
  //   images: [
  //     {
  //       url: "/images/og-image.png", // Add a proper OG image in your public folder
  //       width: 1200,
  //       height: 630,
  //       alt: "Shabeer Portfolio",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yourTwitterHandle", // Replace with your Twitter handle
  //   creator: "@yourTwitterHandle",
  //   title: "Shabeer | Full Stack & React Native Developer",
  //   description:
  //     "Building scalable web and mobile applications using Next.js, React Native, and backend technologies.",
  //   images: ["/images/og-image.png"],
  // },
  
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

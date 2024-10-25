import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "@/components/Layout/themeToggle/theme-provider";
import QueryProvider from "@/components/Layout/reactQuery/QueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import { TIME_TO_CLOSE_TOAST } from "@/constant/schema";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const toastConfig: ToastContainerProps = {
  position: "bottom-center",
  autoClose: TIME_TO_CLOSE_TOAST,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-between gap-0`}
      >
        <main>
          <QueryProvider>
            <ThemeProvider defaultTheme="light" attribute="class">
              <ToastContainer {...toastConfig} />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
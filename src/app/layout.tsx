import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import QueryProvider from "@/components/Layout/reactQuery/QueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import { TIME_TO_CLOSE_TOAST } from "@/constant/schema";
import { Suspense } from "react";
import Loading from "@/loading";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Printzy",
  description: "Make your own custom t-shirt, phone case, mug, and more",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  preload: true,
});
const eduArrowFont = localFont({
  src: "./fonts/EduArrows/EduArrow_wght.ttf",
  weight: "100 200 300 400 500 600 700 800 900",
  style: "normal",
  variable: "--font-edu-arrow",
  preload: true,
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  preload: true,
});

const inter = Inter({
  subsets: ["vietnamese", "latin"],
  variable: "--font-inter",
  preload: true,
});

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
  const cookieStore = cookies();
  console.log(cookieStore.get("printzy_ac_token"));
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} ${roboto.variable} ${eduArrowFont.variable}`}
    >
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col gap-0`}
      >
        <QueryProvider>
          {/* <ThemeProvider defaultTheme="light" attribute="class"> */}
          <ToastContainer {...toastConfig} />
          <Navbar />
          <Suspense fallback={<Loading></Loading>}>
            <main className={`flex-1 mt-24`}>{children}</main>
          </Suspense>
          <Footer />
          {/* </ThemeProvider> */}
        </QueryProvider>
      </body>
    </html>
  );
}

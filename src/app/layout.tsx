import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/auth";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import MainLayout from "@/components/Layout/MainLayout";
import AntdStyledComponentsRegistry from "@/libs/AntdStyledComponentsRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        ></link>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <AntdStyledComponentsRegistry>
            <MainLayout>{children}</MainLayout>
            <Toaster position="bottom-right" />
          </AntdStyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}

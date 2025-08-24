import "./globals.css";
import { ReactNode } from "react";
import Providers from "./providers";
import AuthProvider from "./AuthProvider";

export const metadata = {
  title: "ShopSphere — E-commerce Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased min-h-screen">
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

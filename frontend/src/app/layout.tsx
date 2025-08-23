import "./globals.css";
import Providers from "./providers";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export const metadata = { title: "ShopSphere — E-commerce Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        <Providers>
          <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <div className="p-6">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

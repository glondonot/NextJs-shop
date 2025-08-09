import "./globals.css";
import type { ReactNode } from "react";
import Navigation from "../components/Navigation";
import NotificationProvider from "../components/NotificationProvider";

export const metadata = {
  title: "TechStore - Tienda de Tecnología",
  description: "Tienda profesional de tecnología con carrito inteligente y optimización de presupuesto",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NotificationProvider>
          <div className="page-layout">
            <Navigation />
            <main className="page-content">
              {children}
            </main>
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
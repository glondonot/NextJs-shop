import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Tienda Tech",
  description: "Mini tienda de tecnología con carrito y optimización",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div suppressHydrationWarning>
          {children}
        </div>
      </body>
    </html>
  );
}
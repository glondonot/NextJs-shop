"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/" className="brand-link">
            TechStore
          </Link>
        </div>
        
        <div className="nav-links">
          <Link 
            href="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Catálogo
          </Link>
          <Link 
            href="/budget" 
            className={`nav-link ${isActive('/budget') ? 'active' : ''}`}
          >
            Presupuesto
          </Link>
          <Link 
            href="/cart" 
            className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
          >
            <Image 
              src="/icons/cart.svg" 
              alt="Carrito" 
              width={20} 
              height={20} 
              className="cart-icon"
            />
            Carrito
          </Link>
        </div>
      </div>
    </nav>
  );
}
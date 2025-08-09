"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartItemRow from "./CartItemRow";
import CartOptimizer from "./CartOptimizer";
import { CartItem } from "../utils/findBestCombination";
import { getCookie } from "../utils/clientCookies";
import { useNotification } from "./NotificationProvider";

export default function CartClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showNotification } = useNotification();

  const loadCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        credentials: 'include',
      });
      const data = await res.json();
      setCart(data.cart || []);
    } catch (error) {
      console.error("Error loading cart:", error);
      try {
        const cookieValue = getCookie("shopping_cart_v1");
        if (cookieValue) {
          const parsedCart = JSON.parse(cookieValue);
          setCart(Array.isArray(parsedCart) ? parsedCart : []);
        } else {
          setCart([]);
        }
      } catch {
        setCart([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
    console.log("CartClient - Document cookies:", document.cookie);
  }, []);

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ action: "update", productId, quantity }),
      });
      loadCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      showNotification("error", "Error al actualizar", "No se pudo actualizar la cantidad del producto");
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ action: "remove", productId }),
      });
      loadCart();
    } catch (error) {
      console.error("Error removing item:", error);
      showNotification("error", "Error al eliminar", "No se pudo eliminar el producto del carrito");
    }
  };

  const acceptOptimization = async (optimized: CartItem[]) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ action: "replace", items: optimized }),
      });
      loadCart();
    } catch (error) {
      console.error("Error accepting optimization:", error);
      showNotification("error", "Error en optimización", "No se pudo aplicar la optimización al carrito");
    }
  };

  const checkout = async () => {
    try {
      showNotification("success", "¡Compra realizada!", "Tu pedido ha sido procesado exitosamente");
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ action: "clear" }),
      });
      router.push("/");
    } catch (error) {
      console.error("Error during checkout:", error);
      showNotification("error", "Error en el pago", "No se pudo procesar tu compra. Inténtalo de nuevo");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="loading mb-4"></div>
        <p className="text-muted">Cargando carrito...</p>
      </div>
    );
  }

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return cart.length === 0 ? (
    <div className="cart-empty">
      <h3 className="mb-4">Tu carrito está vacío</h3>
      <p className="text-muted mb-6">Agrega algunos productos para comenzar tu compra</p>
    </div>
  ) : (
    <div className="cart-content">
      <div className="cart-items">
        {cart.map((item) => (
          <CartItemRow key={item.id} item={item} onUpdate={updateQuantity} onRemove={removeItem} />
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="total-section">
          <h3 className="total-amount">Total: ${total.toFixed(2)}</h3>
        </div>
        
        <CartOptimizer currentCart={cart} onAccept={acceptOptimization} />
        
        <button 
          className="btn btn-success btn-lg w-full mt-6"
          onClick={checkout}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
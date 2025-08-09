"use client";

import { Product } from "../data/products";
import ProductCard from "./ProductCard";
import { useNotification } from "./NotificationProvider";

type Props = {
  product: Product;
};

export default function AddToCartClient({ product }: Props) {
  const { showNotification } = useNotification();
  
  const addToCart = async (productId: number, quantity: number) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ action: "add", productId, quantity }),
      });
      showNotification("success", "Producto agregado", `Se agregó ${quantity} unidad${quantity > 1 ? 'es' : ''} al carrito`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotification("error", "Error al agregar", "No se pudo agregar el producto al carrito");
    }
  };

  return <ProductCard product={product} onAdd={addToCart} />;
}
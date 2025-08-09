"use client";

import { useEffect, useState } from "react";
import { Product } from "../data/products";
import AddToCartClient from "./AddToCartClient";

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Error al cargar productos");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="loading mb-4"></div>
        <p className="text-muted">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <h3 className="text-danger mb-4">Error al cargar productos</h3>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-6">
        <h3 className="mb-4">No hay productos disponibles</h3>
        <p className="text-muted">Vuelve más tarde para ver nuevos productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-auto gap-6">
      {products.map((product) => (
        <AddToCartClient key={product.id} product={product} />
      ))}
    </div>
  );
}
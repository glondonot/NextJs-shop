"use client";

import { useEffect, useState } from "react";
import { Product } from "../data/products";
import BudgetClient from "./BudgetClient";

export default function BudgetClientWrapper() {
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
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (products.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  return <BudgetClient products={products} />;
}
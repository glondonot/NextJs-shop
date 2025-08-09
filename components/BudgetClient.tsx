"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "../data/products";
import { useNotification } from "./NotificationProvider";
import { CartItem } from "../utils/findBestCombination";

type Props = {
  products: Product[];
};

export default function BudgetClient({ products }: Props) {
  const [budget, setBudget] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<CartItem[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const optimize = async () => {
    if (budget <= 0) {
      showNotification("warning", "Presupuesto requerido", "Por favor ingresa un presupuesto válido");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, budget }),
      });
      const data = await res.json();
      setRecommendation(data.selectedItems);
      setTotal(data.total);
    } catch (error) {
      console.error("Error optimizing:", error);
      showNotification("error", "Error en optimización", "No se pudo buscar la mejor combinación de productos");
    } finally {
      setLoading(false);
    }
  };

  const addAllToCart = async () => {
    if (!recommendation) return;
    
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ action: "replace", items: recommendation }),
      });
      showNotification("success", "Productos agregados", "La selección optimizada se agregó al carrito");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotification("error", "Error al agregar", "No se pudieron agregar los productos al carrito");
    }
  };

  return (
    <div className="budget-optimizer">
      <div className="budget-input-section">
        <div className="input-group">
          <label htmlFor="budget" className="input-label">
            Presupuesto máximo
          </label>
          <div className="input-with-button">
            <input
              id="budget"
              type="number"
              className="input budget-input"
              placeholder="Ingresa tu presupuesto"
              value={budget || ""}
              onChange={(e) => setBudget(Number(e.target.value))}
              min="0"
              step="1"
            />
            <button 
              className="btn btn-primary"
              onClick={optimize} 
              disabled={loading || budget <= 0}
            >
              {loading ? (
                <>
                  <span className="loading"></span>
                  Optimizando...
                </>
              ) : (
                "Optimizar Selección"
              )}
            </button>
          </div>
        </div>
      </div>

      {recommendation && (
        <div className="recommendation-section">
          <h3 className="recommendation-title">Recomendación Optimizada</h3>
          {recommendation.length === 0 ? (
            <div className="no-products">
              <h4>Sin resultados</h4>
              <p className="text-muted">No encontramos productos dentro de tu presupuesto. Intenta aumentar el monto disponible.</p>
            </div>
          ) : (
            <div className="recommendation-content">
              <div className="recommended-products">
                {recommendation.map((r) => (
                  <div key={r.id} className="recommended-item">
                    {r.image && (
                      <div className="recommended-item-image">
                        <Image src={r.image} alt={r.name} width={60} height={60} />
                      </div>
                    )}
                    <div className="item-info">
                      <span className="item-name">{r.name}</span>
                      <span className="item-quantity">x {r.quantity}</span>
                    </div>
                    <span className="item-total">${(r.price * r.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="recommendation-summary">
                <div className="total-section">
                  <span className="total-label">Total optimizado: </span>
                  <span className="total-amount">${total.toFixed(2)}</span>
                </div>
                
                <button 
                  className="btn btn-success btn-lg w-full"
                  onClick={addAllToCart}
                >
                  Agregar Selección al Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
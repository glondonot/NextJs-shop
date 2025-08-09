"use client";

import { useState } from "react";
import Image from "next/image";
import { CartItem } from "../utils/findBestCombination";
import { useNotification } from "./NotificationProvider";

type Props = {
  currentCart: CartItem[];
  onAccept: (optimized: CartItem[]) => void;
};

export default function CartOptimizer({ currentCart, onAccept }: Props) {
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<CartItem[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [alreadyOptimal, setAlreadyOptimal] = useState(false);
  const { showNotification } = useNotification();

  const optimize = async () => {
    const res = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: currentCart, budget }),
    });
    const data = await res.json();
    setRecommendation(data.selectedItems);
    setTotal(data.total);
    setAlreadyOptimal(data.alreadyOptimal);
  };

  const handleApplyOptimization = (optimized: CartItem[]) => {
    onAccept(optimized);
    showNotification("success", "Optimización aplicada", "Tu carrito ha sido optimizado según tu presupuesto");
    setOpen(false);
    setRecommendation(null);
    setBudget(0);
  };

  return (
    <div className="cart-optimizer">
      <button 
        className={`optimizer-toggle-btn ${open ? 'optimizer-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="optimizer-btn-content">
          <div className="optimizer-btn-icon">
            <Image 
              src="/icons/optimize.svg" 
              alt="Optimizar" 
              width={20} 
              height={20}
            />
          </div>
          <div className="optimizer-btn-text">
            <span className="optimizer-btn-title">
              {open ? "Cerrar Optimizador" : "Optimizar Carrito"}
            </span>
            <span className="optimizer-btn-subtitle">
              {open ? "Ocultar opciones de optimización" : "Ajustar productos según tu presupuesto"}
            </span>
          </div>
          <div className="optimizer-btn-arrow">
            {open ? "↑" : "↓"}
          </div>
        </div>
      </button>

      {open && (
        <div className="cart-optimizer-content">
          <div className="input-group">
            <label htmlFor="cart-budget" className="input-label">
              Presupuesto máximo
            </label>
            <div className="input-with-button">
              <input
                id="cart-budget"
                type="number"
                className="input"
                placeholder="Ingresa tu presupuesto"
                value={budget || ""}
                onChange={(e) => setBudget(Number(e.target.value))}
                min="0"
                step="1"
              />
              <button 
                className="btn btn-primary"
                onClick={optimize}
                disabled={budget <= 0}
              >
                Optimizar
              </button>
            </div>
          </div>

          {recommendation && (
            <div className="cart-optimization-result">
              {recommendation.length === 0 ? (
                <div className="no-products">
                  <h4>Sin resultados</h4>
                  <p className="text-muted">No encontramos productos dentro de tu presupuesto. Intenta aumentar el monto disponible.</p>
                </div>
              ) : alreadyOptimal ? (
                <div className="optimization-message">
                  <h4>Optimización completa</h4>
                  <p className="text-muted">Ya tienes la mejor combinación posible dentro de tu presupuesto.</p>
                </div>
              ) : (
                <div className="optimization-content">
                  <h4 className="optimization-title">Recomendación optimizada:</h4>
                  <div className="optimized-products">
                    {recommendation.map((r) => (
                      <div key={r.id} className="optimized-item">
                        {r.image && (
                          <div className="optimized-item-image">
                            <img src={r.image} alt={r.name} />
                          </div>
                        )}
                        <div className="optimized-item-info">
                          <span className="optimized-item-name">{r.name}</span>
                          <span className="optimized-item-quantity">x {r.quantity}</span>
                        </div>
                        <span className="optimized-item-total">${(r.price * r.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="optimization-summary">
                    <div className="optimization-total">
                      <span className="total-label">Nuevo total:</span>
                      <span className="total-amount">${total.toFixed(2)}</span>
                    </div>
                    <button 
                      className="btn btn-success w-full"
                      onClick={() => handleApplyOptimization(recommendation)}
                    >
                      Aplicar Optimización
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
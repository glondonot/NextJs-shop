"use client";

import { useState } from "react";
import { Product } from "../data/products";

type Props = {
  product: Product;
  onAdd: (productId: number, quantity: number) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="card">
      {product.image && (
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-img"
          />
        </div>
      )}
      <div className="card-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>
      </div>
      
      <div className="card-footer">
        <div className="product-actions">
          <div className="quantity-controls">
            <button 
              className="btn btn-sm btn-secondary"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button 
              className="btn btn-sm btn-secondary"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={() => onAdd(product.id, quantity)}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
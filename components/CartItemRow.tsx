"use client";

import { CartItem } from "../utils/findBestCombination";

type Props = {
  item: CartItem;
  onUpdate: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
};

export default function CartItemRow({ item, onUpdate, onRemove }: Props) {
  return (
    <div className="cart-item">
      {item.image && (
        <div className="cart-item-image">
          <img src={item.image} alt={item.name} />
        </div>
      )}
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="btn btn-sm btn-secondary"
          onClick={() => onUpdate(item.id, Math.max(1, item.quantity - 1))}
        >
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button 
          className="btn btn-sm btn-secondary"
          onClick={() => onUpdate(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      
      <div className="cart-item-total">
        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
      
      <button 
        className="btn btn-sm btn-danger cart-item-remove"
        onClick={() => onRemove(item.id)}
        title="Eliminar producto"
      >
        ×
      </button>
    </div>
  );
}
import { NextRequest } from "next/server";
import { PRODUCTS, type Product } from "../../../data/products";
import { CART_COOKIE_NAME, parseCookies, createCookieResponse } from "../../../utils/cookies";

type CartItem = Product & { quantity: number };

export async function GET(req: NextRequest) {
  const cookies = parseCookies(req);
  let cart: CartItem[] = [];
  
  try {
    if (cookies[CART_COOKIE_NAME]) {
      const parsed = JSON.parse(cookies[CART_COOKIE_NAME]);
      cart = Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    cart = [];
  }
  return createCookieResponse({ cart }, cart, CART_COOKIE_NAME);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookies = parseCookies(req);
    let cart: CartItem[] = [];
    try {
      if (cookies[CART_COOKIE_NAME]) {
        const parsed = JSON.parse(cookies[CART_COOKIE_NAME]);
        cart = Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      cart = [];
    }

  const action = body.action ?? "add";

  if (action === "clear") {
    return createCookieResponse({ cart: [] }, [], CART_COOKIE_NAME);
  }

  if (action === "replace" && Array.isArray(body.items)) {
    const filteredItems = body.items.filter((i: CartItem) => i.quantity > 0);
    return createCookieResponse({ cart: filteredItems }, filteredItems, CART_COOKIE_NAME);
  }

  const productId = Number(body.productId);
  const quantity = Math.max(1, Math.floor(Number(body.quantity) || 1));
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return createCookieResponse({ error: "Product not found" }, cart, CART_COOKIE_NAME);

  if (action === "add") {
    const existing = cart.find((c) => c.id === productId);
    if (existing) existing.quantity += quantity;
    else {
      const newItem = { ...product, quantity };
      cart.push(newItem);
    }
    return createCookieResponse({ cart }, cart, CART_COOKIE_NAME);
  }

  if (action === "update") {
    const existing = cart.find((c) => c.id === productId);
    if (existing) {
      existing.quantity = quantity;
      if (existing.quantity <= 0) cart = cart.filter((c) => c.id !== productId);
      return createCookieResponse({ cart }, cart, CART_COOKIE_NAME);
    }
    return createCookieResponse({ error: "Item not in cart" }, cart, CART_COOKIE_NAME);
  }

  if (action === "remove") {
    cart = cart.filter((c) => c.id !== productId);
    return createCookieResponse({ cart }, cart, CART_COOKIE_NAME);
  }

    return createCookieResponse({ error: "Unknown action" }, cart, CART_COOKIE_NAME);
  } catch (error) {
    console.error("Cart API error:", error);
    return createCookieResponse({ error: "Internal server error" }, [], CART_COOKIE_NAME);
  }
}
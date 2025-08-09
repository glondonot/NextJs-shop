import { NextRequest, NextResponse } from "next/server";
import { findBestCombination } from "../../../utils/findBestCombination";
import { type Product } from "../../../data/products";

type CartItem = Product & { quantity: number };

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { products, budget } = body as { products: unknown; budget: unknown };

    if (!Array.isArray(products) || typeof budget !== "number" || budget < 0) {
      return NextResponse.json({ error: "Invalid request: products must be an array and budget must be a positive number" }, { status: 400 });
    }

    const validProducts = products.filter((p: unknown): p is CartItem => 
      p !== null && typeof p === "object" && 
      "id" in p && "price" in p && 
      typeof (p as CartItem).id === "number" && 
      typeof (p as CartItem).price === "number" && 
      (p as CartItem).price > 0
    );

    if (validProducts.length === 0) {
      return NextResponse.json({ error: "No valid products provided" }, { status: 400 });
    }

    const currentTotal = validProducts.reduce((acc: number, p: CartItem) => {
      const qty = Math.max(1, Math.floor(Number(p.quantity) || 1));
      return acc + (Number(p.price) || 0) * qty;
    }, 0);

    const result = findBestCombination(validProducts, budget);

    const alreadyOptimal = budget >= currentTotal && result.total >= currentTotal;

    return NextResponse.json({
      selectedItems: result.selectedItems,
      total: result.total,
      currentTotal,
      alreadyOptimal,
    });
  } catch (error) {
    console.error("Optimize API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
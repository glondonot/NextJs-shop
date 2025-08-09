import { NextRequest, NextResponse } from "next/server";
import { findBestCombination } from "../../../utils/findBestCombination";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { products, budget } = body;

    if (!Array.isArray(products) || typeof budget !== "number" || budget < 0) {
      return NextResponse.json({ error: "Invalid request: products must be an array and budget must be a positive number" }, { status: 400 });
    }

    const validProducts = products.filter((p: any) => 
      p && typeof p.id === "number" && typeof p.price === "number" && p.price > 0
    );

    if (validProducts.length === 0) {
      return NextResponse.json({ error: "No valid products provided" }, { status: 400 });
    }

    const currentTotal = validProducts.reduce((acc: number, p: any) => {
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
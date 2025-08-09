export type Product = {
  id: number;
  name: string;
  price: number; 
  image?: string;
  description?: string;
};

export const PRODUCTS: Product[] = [
  { id: 1, name: "Laptop Gamer X1", price: 1200, image: "/images/laptop.jpg" },
  { id: 2, name: "Mouse Inalámbrico M200", price: 45, image: "/images/mouse.jpg" },
  { id: 3, name: "Teclado Mecánico TKL", price: 120, image: "/images/keyboard.jpg" },
  { id: 4, name: "Auriculares Over-Ear A7", price: 150, image: "/images/headset.jpg" },
  { id: 5, name: "Monitor 24\" 1080p", price: 220, image: "/images/monitor.jpg" },
  { id: 6, name: "SSD NVMe 1TB", price: 130, image: "/images/ssd.jpg" },
  { id: 7, name: "Webcam 1080p", price: 70, image: "/images/webcam.jpg" },
  { id: 8, name: "Router WiFi 6", price: 200, image: "/images/router.jpg" },
  { id: 9, name: "Mousepad Gamer", price: 30, image: "/images/mousepad.jpg" },
];
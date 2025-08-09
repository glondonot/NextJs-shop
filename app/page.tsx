import ProductsClient from "../components/ProductsClient";

export default function HomePage() {
  return (
    <div className="main-content">
      <div className="container">
        <header className="mb-6">
          <h1>Catálogo de Productos</h1>
          <p className="text-muted">Descubre nuestra selección de productos tecnológicos de alta calidad</p>
        </header>
        <ProductsClient />
      </div>
    </div>
  );
}
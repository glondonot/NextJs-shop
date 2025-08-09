import CartClient from "../../components/CartClient";

export default function CartPage() {
  return (
    <div className="main-content">
      <div className="container">
        <header className="mb-6">
          <h1>Carrito de Compras</h1>
          <p className="text-muted">Revisa y gestiona tus productos seleccionados</p>
        </header>
        <CartClient />
      </div>
    </div>
  );
}
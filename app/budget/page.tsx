import BudgetClientWrapper from "../../components/BudgetClientWrapper";

export default function BudgetPage() {
  return (
    <div className="main-content">
      <div className="container">
        <header className="mb-6">
          <h1>Optimización por Presupuesto</h1>
          <p className="text-muted">Especifica tu presupuesto y te daremos la selección más óptima de productos en nuestra tienda</p>
        </header>
        <BudgetClientWrapper />
      </div>
    </div>
  );
}
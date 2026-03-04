import BudgetCard from "../components/budget/BudgetCard";

const categories = ["Food", "Rent", "Utilities", "Entertainment"];

const Budgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat) => (
        <BudgetCard key={cat} category={cat} />
      ))}
    </div>
  );
};

export default Budgets;
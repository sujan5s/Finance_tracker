import { useFinance } from "../../context/FinanceContext";

const TransactionForm = () => {

  const { fetchTransactions } = useFinance();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        amount,
        type,
        category
      })
    });

    fetchTransactions();

  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
};

export default TransactionForm;
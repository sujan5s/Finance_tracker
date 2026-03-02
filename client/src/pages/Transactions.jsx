import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";

const Transactions = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">Transactions Page</h1>
      <TransactionForm />
      <TransactionTable />
    </div>
  );
};

export default Transactions;
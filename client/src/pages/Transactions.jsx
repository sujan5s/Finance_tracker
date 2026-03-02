import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";

const Transactions = () => {
  return (
    <div className="space-y-6">
      <TransactionForm />
      <TransactionTable />
    </div>
  );
};

export default Transactions;
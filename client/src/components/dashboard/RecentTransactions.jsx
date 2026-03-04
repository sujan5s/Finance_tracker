const RecurringList = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-4">Recurring Transactions</h2>

      <ul className="space-y-3">
        <li className="flex justify-between bg-rose-50 p-3 rounded-xl">
          Netflix <span>₹499 / month</span>
        </li>
        <li className="flex justify-between bg-rose-50 p-3 rounded-xl">
          Rent <span>₹10,000 / month</span>
        </li>
      </ul>
    </div>
  );
};

export default RecurringList;
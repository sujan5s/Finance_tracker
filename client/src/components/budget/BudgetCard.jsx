const BudgetCard = ({ category }) => {
  return (
    <div className="bg-purple-100 p-6 rounded-2xl shadow-md">
      <h3 className="font-semibold">{category}</h3>

      <input
        type="number"
        placeholder="Set Monthly Limit"
        className="mt-3 p-2 rounded-xl w-full"
      />

      <div className="mt-3 bg-white rounded-full h-3">
        <div className="bg-rose-400 h-3 rounded-full w-2/3"></div>
      </div>
    </div>
  );
};

export default BudgetCard;
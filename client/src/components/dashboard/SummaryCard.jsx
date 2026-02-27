const SummaryCard = ({ title, amount, color }) => {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-md`}>
      <h2 className="text-gray-600">{title}</h2>
      <p className="text-3xl font-bold mt-2">{amount}</p>
    </div>
  );
};

export default SummaryCard;
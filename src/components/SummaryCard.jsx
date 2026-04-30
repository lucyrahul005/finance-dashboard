const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-md hover:shadow-xl transition rounded-2xl p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">₹{value}</h2>
    </div>
  );
};

export default SummaryCard;

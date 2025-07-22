export default function calculateSellBusinessResults({ results }) {
  return (
    <div className="mt-12 rounded-lg space-y-4 text-lg">
      <div className="bg-violate-500 text-white rounded-xl p-6">
        <p className="font-semibold">V Impact (Your Savings)</p>
        <p className="text-3xl font-bold">
          $
          {results.vImpact.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className="bg-violate-100 text-black rounded-xl p-6">
        <p className="font-semibold">Money Left in your Pocket with V</p>
        <p className="text-3xl font-bold">
          $
          {results.moneyLeftAfterV.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className="bg-gray-100 text-black rounded-xl p-6">
        <p className="font-semibold">Money Left in your Pocket without V</p>
        <p className="text-3xl font-bold">
          $
          {results.moneyLeftBeforeV.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </div>
  );
}

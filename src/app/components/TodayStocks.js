const TodayStocks = () => {
  const date = "2024-07-09"; // 표시할 날짜
  const risingStocks = [
    { rank: 1, name: "코아스", change: "+29.97%" },
    { rank: 2, name: "대상홀딩스우", change: "+29.96%" },
    { rank: 3, name: "태양금속우", change: "+29.92%" },
    { rank: 4, name: "태양금속", change: "+29.92%" },
    { rank: 5, name: "디티앤씨알오오오오오오오오", change: "+29.90%" },
  ];

  const fallingStocks = [
    { rank: 1, name: "한주라이트메탈", change: "-23.10%" },
    { rank: 2, name: "HB솔루션", change: "-22.20%" },
    { rank: 3, name: "웨스트라이즈", change: "-14.33%" },
    { rank: 4, name: "HB테크놀러지", change: "-12.64%" },
    { rank: 5, name: "투비소프트트트트트트트트트트", change: "-11.45%" },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🤔 오늘의 종목</h2>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r border-gray-200 pr-4">
          <h3 className="font-semibold mb-2">🚀 급등</h3>
          <ul>
            {risingStocks.map((stock, index) => (
              <li key={index} className="flex justify-between mb-1">
                <span className="text-sm truncate mr-2">
                  {stock.rank} {stock.name}
                </span>
                <span className="text-sm text-red-500">{stock.change}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">🍂 급락</h3>
          <ul>
            {fallingStocks.map((stock, index) => (
              <li key={index} className="flex justify-between mb-1">
                <span className="text-sm truncate mr-2">
                  {stock.rank} {stock.name}
                </span>
                <span className="text-sm text-blue-500">{stock.change}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodayStocks;

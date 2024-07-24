import CoinList from "@/components/coin/CoinList";

const CoinPage = () => {
  const coinData = [
    {
      rank: 1,
      name: "비트코인",
      price: "34,573.00",
      high: "35,000.00",
      low: "34,000.00",
      volume: "3,250.00",
    },
    {
      rank: 2,
      name: "이더리움",
      price: "2,678.00",
      high: "2,750.00",
      low: "2,600.00",
      volume: "2,100.00",
    },
    {
      rank: 3,
      name: "테더",
      price: "1.01",
      high: "1.02",
      low: "0.99",
      volume: "12,300.00",
    },
    {
      rank: 4,
      name: "BNB",
      price: "356.00",
      high: "365.00",
      low: "350.00",
      volume: "2,800.00",
    },
    {
      rank: 5,
      name: "솔라나",
      price: "98.50",
      high: "100.00",
      low: "95.00",
      volume: "1,750.00",
    },
    {
      rank: 6,
      name: "USDC",
      price: "1.00",
      high: "1.01",
      low: "0.99",
      volume: "10,500.00",
    },
    {
      rank: 7,
      name: "XRP",
      price: "0.76",
      high: "0.80",
      low: "0.70",
      volume: "5,400.00",
    },
    {
      rank: 8,
      name: "Toncoin",
      price: "3.50",
      high: "3.70",
      low: "3.30",
      volume: "950.00",
    },
    {
      rank: 9,
      name: "도지코인",
      price: "0.25",
      high: "0.27",
      low: "0.22",
      volume: "8,300.00",
    },
    {
      rank: 10,
      name: "카르다노",
      price: "1.35",
      high: "1.40",
      low: "1.30",
      volume: "2,600.00",
    },
    {
      rank: 11,
      name: "폴카닷",
      price: "18.00",
      high: "19.00",
      low: "17.00",
      volume: "1,200.00",
    },
    {
      rank: 12,
      name: "체인링크",
      price: "25.00",
      high: "26.00",
      low: "24.00",
      volume: "900.00",
    },
    {
      rank: 13,
      name: "스텔라루멘",
      price: "0.32",
      high: "0.34",
      low: "0.30",
      volume: "6,700.00",
    },
    {
      rank: 14,
      name: "에이브",
      price: "155.00",
      high: "160.00",
      low: "150.00",
      volume: "720.00",
    },
    {
      rank: 15,
      name: "트론",
      price: "0.08",
      high: "0.09",
      low: "0.07",
      volume: "15,400.00",
    },
    {
      rank: 16,
      name: "이오스",
      price: "4.50",
      high: "4.80",
      low: "4.20",
      volume: "1,450.00",
    },
    {
      rank: 17,
      name: "라이트코인",
      price: "180.00",
      high: "185.00",
      low: "175.00",
      volume: "1,100.00",
    },
    {
      rank: 18,
      name: "비체인",
      price: "0.12",
      high: "0.13",
      low: "0.11",
      volume: "7,800.00",
    },
    {
      rank: 19,
      name: "이오타",
      price: "1.20",
      high: "1.25",
      low: "1.15",
      volume: "1,900.00",
    },
    {
      rank: 20,
      name: "제트캐시",
      price: "96.00",
      high: "98.00",
      low: "94.00",
      volume: "2,100.00",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <CoinList data={coinData} />
    </div>
  );
};

export default CoinPage;

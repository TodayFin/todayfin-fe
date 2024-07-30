const RecommendedNews = () => {
  const newsArticles = [
    { title: "Breaking: Market hits all-time high", date: "2024-07-16" },
    { title: "New breakthrough in AI technology", date: "2024-07-15" },
    {
      title: "Climate change and its impact on global markets",
      date: "2024-07-14",
    },
    { title: "Top 10 stocks to watch this week", date: "2024-07-13" },
    {
      title: "How to prepare for the next financial crisis",
      date: "2024-07-12",
    },
    {
      title:
        "The future of cryptocurrency and blockchain The future of cryptocurrency and blockchain The future of cryptocurrency and blockchain",
      date: "2024-07-11",
    },
  ];
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold">🌠 추천 뉴스</h2>
      <ul>
        {newsArticles.map((article, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b border-gray-200 last:border-none"
          >
            <a
              href=""
              className="flex-1 hover:underline mt-2 mb-2 mr-8 truncate "
              title={article.title}
            >
              {article.title}
            </a>
            <span className="flex-shrink-0 text-gray-500 text-sm">
              {article.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedNews;

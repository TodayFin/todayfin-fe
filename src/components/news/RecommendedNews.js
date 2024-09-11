import Link from "next/link";

const RecommendedNews = ({ recommended }) => {
  const formatDate = (dateString) => {
    const dateParts = dateString.match(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/
    );

    if (!dateParts) {
      return "Invalid date";
    }

    const [_, year, month, day, hour, minute, second] = dateParts;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold">🌠 추천 뉴스</h2>
      <ul>
        {recommended.map((news, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b border-gray-200 last:border-none"
          >
            <Link
              href={`/news/${news.id}`}
              className="flex-1 hover:underline mt-2 mb-2 mr-8 truncate"
              title={news.title}
            >
              {news.title}
            </Link>
            <span className="flex-shrink-0 text-gray-500 text-sm">
              {formatDate(news.date)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedNews;

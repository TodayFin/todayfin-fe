export default function handler(req, res) {
  const { newsId } = req.query;

  const mockData = {
    id: newsId,
    title: "삼성전자, 조직 개편 'HBM 개발팀' 신설...'HBM에 더 집중'",
    category: "비즈니스",
    article: `삼성전자가 HBM(고대역폭 메모리) 개발팀을 신설했습니다. 
      삼성전자 디바이스솔루션(DS) 부문은 오늘(4일) HBM 개발팀 신설을 골자로 하는 조직 개편을 실시했습니다.
      이번 개편으로 HBM 시장 확대를 목표로 하는 전략을 강화할 계획입니다.`,
    urlToImage:
      "https://ts2.mm.bing.net/th?q=new%20%EC%B6%98%EC%8B%9D%EC%9D%B4%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4",

    description: `삼성전자가 HBM(고대역폭 메모리) 개발팀을 신설했습니다. 
      삼성전자 디바이스솔루션(DS) 부문은 오늘(4일) HBM 개발팀 신설을 골자로 하는 조직 개편을 실시했습니다.
      이번 개편으로 HBM 시장 확대를 목표로 하는 전략을 강화할 계획입니다.`,
    source: "머니투데이",
    author: "홍길동",
    publishedAt: "2024-07-29T14:30:34Z",
    views: 15000,
    comments: [
      {
        user: "user1",
        text: "아주 좋은 기사네요!",
        timestamp: "2024-07-09 16:10:00",
      },
      {
        user: "user2",
        text: "유익한 정보 감사합니다.",
        timestamp: "2024-07-09 16:12:00",
      },
    ],
    recommended: [
      {
        title:
          "추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 ",
        url: "https://news.example.com/1",
        urlToImage:
          "https://ts2.mm.bing.net/th?q=new%20%EC%B6%98%EC%8B%9D%EC%9D%B4%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4",
      },
      {
        title:
          "추천 뉴스 제목 2 추천 뉴스 제목 2 추천 뉴스 제목 2 추천 뉴스 제목 2 추천 뉴스 제목 2",
        url: "https://news.example.com/2",
        urlToImage:
          "https://ts2.mm.bing.net/th?q=new%20%EC%B6%98%EC%8B%9D%EC%9D%B4%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4",
      },
      {
        title:
          "추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 ",
        url: "https://news.example.com/1",
        urlToImage:
          "https://ts2.mm.bing.net/th?q=new%20%EC%B6%98%EC%8B%9D%EC%9D%B4%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4",
      },
      {
        title:
          "추천 뉴스 제목 2 추천 뉴스 제목 2 추천 뉴스 제목 2 추천 뉴스 제목 2 추천 뉴스 제목 2",
        url: "https://news.example.com/2",
        urlToImage:
          "https://ts2.mm.bing.net/th?q=new%20%EC%B6%98%EC%8B%9D%EC%9D%B4%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4",
      },
      {
        title:
          "추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 추천 뉴스 제목 1 ",
        url: "https://news.example.com/1",
        urlToImage:
          "https://ts2.mm.bing.net/th?q=new%20%EC%B6%98%EC%8B%9D%EC%9D%B4%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4",
      },
    ],
  };

  res.status(200).json(mockData);
}

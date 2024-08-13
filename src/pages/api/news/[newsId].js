export default function handler(req, res) {
  const { newsId } = req.query;

  const mockData = {
    id: newsId,
    title: "Gov't to raise med school admissions quota by 2,000 from 2025",
    category: "비즈니스",
    article: ``,
    urlToImage:
      "https://ts2.mm.bing.net/th?q=new%20%EC%B6%98%EC%8B%9D%EC%9D%B4%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4",

    description: `The government will raise the annual enrollment 1) quota at medical schools by 2,000 starting in 2025 from the 2) current 3,058, Health Minister Cho Kyu-hong announced, Tuesday.


The ultimate goal is to ensure improved public access to medical services, particularly in rural areas, and to 3) alleviate 4) chronic 5) shortages of physicians in critical fields such as pediatrics and emergency care.


Despite strong opposition from doctors, the Ministry of Health and Welfare made the decision during a health care policy meeting presided over by Cho. The meeting was attended by government officials, healthcare experts, as well as 6) representatives of patients and consumers.


In response to the government's decision, the Korea Medical Association (KMA), a doctors' organization, issued a warning of a general strike following the conclusion of the Lunar New Year holiday on Feb. 12.


“Today’s decision will serve as a momentum for the country’s medical reforms,” the health minister said during the meeting. “Now is the golden time to revive essential treatment fields and prepare for an aging society.”


The total admissions quota of the 40 medical schools in Korea has remained unchanged at 3,058 since 2006.`,
    source: "머니투데이",
    author: "홍길동",
    publishedAt: "2024-07-29T14:30:34Z",
    views: 15000,
    comments: [
      {
        userId: 1,
        user: "user1",
        text: "아주 좋은 기사네요!",
        timestamp: "2024-07-09 16:10:00",
      },
      {
        userId: 2,
        user: "user2",
        text: "유익한 정보 감사합니다. 유익한 정보 감사합니다. 유익한 정보 감사합니다. 유익한 정보 감사합니다. 유익한 정보 감사합니다.",
        timestamp: "2024-07-09 16:12:00",
      },
      {
        userId: 1,
        user: "user1",
        text: "아주 좋은 기사네요!",
        timestamp: "2024-07-09 16:10:00",
      },
      {
        userId: 2,
        user: "user2",
        text: "유익한 정보 감사합니다. 유익한 정보 감사합니다. 유익한 정보 감사합니다. 유익한 정보 감사합니다. 유익한 정보 감사합니다.",
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

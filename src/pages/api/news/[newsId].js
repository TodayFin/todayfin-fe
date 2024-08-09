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

메모리사업부 내에 있었던 HBM 전담 조직을 팀으로 신설한 것으로, 신임 팀장은 고성능 D램 제품 설계 전문가인 손영수 부사장이 맡기로 했습니다.

이 같은 HBM 개발팀 신설은 인공지능 시장 확대로 HBM 수요가 급증하면서, HBM 개발에 집중해 기술 경쟁력을 확보하기 위한 것으로 풀이됩니다.

신설된 개발팀은 HBM3와 HBM3E뿐 아니라 차세대 HBM4 기술 개발에도 나설 것으로 보입니다.

한편 어드밴스드 패키징(AVP) 개발팀과 설비기술연구소도 재편하기로 했습니다.

기존의 AVP 사업팀을 재편한 AVP 개발팀은 전영현 부문장 직속으로 배치됐고, 설비기술연구소도 반도체 공정과 설비 기술 지원 역량을 강화하기 위해 조직을 개편했습니다.

앞서 삼성전자는 지난 5월 반도체 부문 수장을 전 부회장으로 전격 교체하는 등 분위기 쇄신에 나섰습니다.

전 부회장은 당시 취임사에서 “반도체 사업이 과거와 비교해 매우 어려운 상황이라는 것을 절감하고 있다”며 “새로운 각오로 상황을 더욱 냉철하게 분석해 어려움을 극복할 방안을 반드시 찾겠다”고 강조했습니다.

[사진 출처 : 연합뉴스 / 삼성전자 제공]

■ 제보하기
▷ 카카오톡 : 'KBS제보' 검색, 채널 추가
▷ 전화 : 02-781-1234, 4444
▷ 이메일 : kbs1234@kbs.co.kr
▷ 유튜브, 네이버, 카카오에서도 KBS뉴스를 구독해주세요!`,
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

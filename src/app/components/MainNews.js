import NewsThumbnailTitle from "../../components/news/NewsThumbnailTitle";
import NewsThumbnailTitleContent from "../../components/news/NewsThumbnailTitleContent";

const MainNews = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📰 최신 뉴스</h2>
        <span className="text-gray-500 text-sm cursor-pointer">더보기</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <NewsThumbnailTitleContent
          imageSrc="logo.png"
          title="[IPO스타워즈] '최대어' 시프트업, 코스피 입성… '고평가' 논란 이겨낼까"
          content="하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은"
        />
        <NewsThumbnailTitleContent
          imageSrc="logo.png"
          title="폼플리아노 '여름 끝나면 BTC 급등 예측… 지금은 여행 시즌'"
          content="Coiness - 암호화폐 전문 투자자 폼프 인베스트먼트(Pomp Investments) 설립자 앤서니 폼플리아노(Anthony Pompliano)가 CNBC와의 인터뷰에서 여름이"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NewsThumbnailTitle
            imageSrc="logo.png"
            title="폼플리아노 '여름 끝나면 BTC 급등 예측… 지금은 여행 시즌'"
          />
          <NewsThumbnailTitle
            imageSrc="logo.png"
            title="시장 업데이트: AMD와 카바나 주가 상승, 마스터카드와 인튜이트 주가 하락"
          />
          <NewsThumbnailTitle
            imageSrc="logo.png"
            title="신시아 루미스 '공화당 의원 후보자 이안 케인, 블록체인 등 지역사회 문제 이해도 높아'"
          />
        </div>
      </div>
    </div>
  );
};

export default MainNews;

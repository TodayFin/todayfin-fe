const CommunityCard = ({ title, nickname, date, content }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-fit mb-4">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-2"></div>
        <div>
          <p className="font-bold">{nickname}</p>
          <p className="text-gray-500">{date}</p>
        </div>
      </div>
      <p className="font-bold">{title}</p>
      <p className="text-gray-700 line-clamp-8 break-all">{content}</p>
    </div>
  );
};

export default CommunityCard;

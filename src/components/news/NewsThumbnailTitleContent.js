const NewsThumbnailTitleContent = ({ imageSrc, title, content }) => {
  return (
    <div className="flex">
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-80 h-48 object-cover rounded-lg" 
      />
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default NewsThumbnailTitleContent;
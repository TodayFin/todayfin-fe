const NewsThumbnailTitle = ({ imageSrc, title }) => {
  return (
    <div>
      <img src={imageSrc} alt={title} 
        className="w-full h-32 object-cover rounded-lg"/>
      <h2 className="text-lg font-bold mt-2">{title}</h2>
    </div>
  );
};

export default NewsThumbnailTitle;

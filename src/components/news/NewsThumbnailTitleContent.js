import Link from "next/link";

const NewsThumbnailTitleContent = ({ imageSrc, title, content }) => {
  return (
    <Link href="/news/1">
      <div className="flex cursor-pointer">
        <img
          src={imageSrc}
          alt={title}
          className="w-80 h-48 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-700 line-clamp-3">{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsThumbnailTitleContent;

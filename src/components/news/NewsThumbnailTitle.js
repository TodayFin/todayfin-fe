import Image from "next/image";

const NewsThumbnailTitle = ({ imageSrc, title }) => {
  return (
    <div>
      <Image
        src={imageSrc}
        alt={title}
        className="w-full h-32 object-cover rounded-lg"
        width={48}
        height={48}
      />
      <h2 className="text-lg font-bold mt-2">{title}</h2>
    </div>
  );
};

export default NewsThumbnailTitle;

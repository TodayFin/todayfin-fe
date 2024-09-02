import Link from "next/link";
import Image from "next/image";

const NewsThumbnailTitle = ({ id, imageSrc, title }) => {
  return (
    <Link href={`/news/${id}`}>
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
    </Link>
  );
};

export default NewsThumbnailTitle;

import Image from "next/image";

const SentMessage = ({ user, timestamp, text }) => {
  return (
    <div className="mb-4 flex items-start justify-end">
      <div className="flex-1">
        <div className="flex items-center mb-1 justify-end">
          <span className="text-gray-500 text-sm">
            {new Date(timestamp).toLocaleString()}
          </span>
          <span className="font-bold ml-2">{user}</span>
        </div>
        <p className="ml-auto text-gray-700 border p-4 rounded-lg w-fit max-w-[70%] bg-blue-100">
          {text}
        </p>
      </div>
      <div className="ml-4">
        <Image
          src="https://avatars.githubusercontent.com/u/86763857?v=4"
          alt={user}
          className="rounded-full w-12 h-12 object-cover"
        />
      </div>
    </div>
  );
};

export default SentMessage;

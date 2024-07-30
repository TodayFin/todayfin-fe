const ReceivedMessage = ({ user, timestamp, text }) => {
    return (
      <div className="mb-4 flex items-start">
        <div className="mr-4">
          <img
            src="https://avatars.githubusercontent.com/u/86763857?v=4"
            alt={user}
            className="rounded-full w-12 h-12 object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="font-bold mr-2">{user}</span>
            <span className="text-gray-500 text-sm">{new Date(timestamp).toLocaleString()}</span>
          </div>
          <p className="text-gray-700 border p-4 rounded-lg w-fit max-w-[70%] bg-gray-100">
            {text}
          </p>
        </div>
      </div>
    );
  };
  
  export default ReceivedMessage;